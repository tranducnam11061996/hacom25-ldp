[CmdletBinding()]
param(
  [ValidateSet('Start', 'Status', 'Stop')]
  [string]$Action = 'Status'
)

$ErrorActionPreference = 'Stop'

$chromePath = (Resolve-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe').Path
$chromeShortPath = (Resolve-Path 'C:\Progra~1\Google\Chrome\Application\chrome.exe').Path
$chromeExecutablePaths = @($chromePath, $chromeShortPath)
$profilePath = Join-Path $env:LOCALAPPDATA 'HACOM\BrowserAutomation\Profile'
$cdpPort = 9333
$cdpUrl = "http://127.0.0.1:$cdpPort"
$taskName = 'HACOM-Browser-Automation-Start'

function Get-AutomationProcesses {
  @(
    Get-CimInstance Win32_Process | Where-Object {
      $_.ExecutablePath -in $chromeExecutablePaths -and
      $_.CommandLine -like '*--user-data-dir=*' -and
      $_.CommandLine -like "*$profilePath*"
    }
  )
}

function Get-CdpVersion {
  try {
    Invoke-RestMethod -Uri "$cdpUrl/json/version" -TimeoutSec 1
  }
  catch {
    $null
  }
}

function Assert-CdpOwnership {
  if ((Get-CdpVersion) -and (Get-AutomationProcesses).Count -eq 0) {
    throw "Port $cdpPort is controlled by a browser outside the dedicated HACOM automation profile."
  }
}

if ($Action -eq 'Start') {
  New-Item -ItemType Directory -Force -Path $profilePath | Out-Null
  Assert-CdpOwnership

  if (-not (Get-CdpVersion)) {
    $taskArguments = "--headless=new --window-size=1440,1000 --hide-scrollbars --remote-debugging-address=127.0.0.1 --remote-debugging-port=$cdpPort --user-data-dir=`"$profilePath`" --no-first-run about:blank"
    $taskCreated = $false

    try {
      $taskAction = New-ScheduledTaskAction -Execute $chromePath -Argument $taskArguments -WorkingDirectory (Split-Path $chromePath)
      $taskPrincipal = New-ScheduledTaskPrincipal -UserId ([Security.Principal.WindowsIdentity]::GetCurrent().Name) -LogonType Interactive -RunLevel Limited
      $taskSettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
      Register-ScheduledTask -TaskName $taskName -Action $taskAction -Principal $taskPrincipal -Settings $taskSettings -Force | Out-Null
      $taskCreated = $true

      Start-ScheduledTask -TaskName $taskName

      $deadline = [DateTime]::UtcNow.AddSeconds(15)
      while (-not (Get-CdpVersion) -and [DateTime]::UtcNow -lt $deadline) {
        Start-Sleep -Milliseconds 250
      }
    }
    finally {
      if ($taskCreated) {
        Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
      }
    }
  }

  Assert-CdpOwnership
  if (-not (Get-CdpVersion)) {
    throw "Dedicated Chrome did not expose CDP at $cdpUrl within 15 seconds."
  }
}

if ($Action -eq 'Stop') {
  Assert-CdpOwnership
  $processes = Get-AutomationProcesses
  foreach ($process in $processes) {
    Stop-Process -Id $process.ProcessId -Force -ErrorAction SilentlyContinue
  }

  $deadline = [DateTime]::UtcNow.AddSeconds(5)
  while ((Get-CdpVersion) -and [DateTime]::UtcNow -lt $deadline) {
    Start-Sleep -Milliseconds 100
  }
}

$version = Get-CdpVersion
$ownedProcesses = Get-AutomationProcesses

[PSCustomObject]@{
  ready = $null -ne $version
  owned = ($null -ne $version -and $ownedProcesses.Count -gt 0)
  cdpUrl = $cdpUrl
  profilePath = $profilePath
  browser = $version.Browser
  processIds = @($ownedProcesses | ForEach-Object { $_.ProcessId })
} | ConvertTo-Json -Compress
