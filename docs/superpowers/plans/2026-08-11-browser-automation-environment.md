# Browser Automation Environment Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore reliable local browser automation on Windows for both `agent-browser` and the Browser Use workflow, then prove it by opening `D:/hacom-new/index.html` and exercising the carousel controls in a real Chrome renderer.

**Architecture:** Run a dedicated Chrome profile at medium integrity with CDP bound to `127.0.0.1`, and attach both automation clients to that browser instead of letting an elevated parent process launch Chrome. Upgrade the toolchain to supported versions, preserve the user's normal Chrome profile, and provide one project-local lifecycle script for starting, checking, and stopping the isolated automation browser.

**Tech Stack:** Windows PowerShell 5.1, Node.js 24 LTS, npm, `agent-browser` 0.34.0, Python 3.12, uv, `browser-harness`, Chrome DevTools Protocol.

## Global Constraints

- Do not use `--no-sandbox` or run the automation Chrome elevated.
- Bind CDP to loopback only and use the verified project port `9333`; port `9222` is already owned by the user's Chrome.
- Use the dedicated profile `%LOCALAPPDATA%\HACOM\BrowserAutomation\Profile`; never attach automation to the user's normal Chrome profile.
- Stop or delete only processes and temporary directories proven to belong to `C:\Users\ADMIN\.agent-browser\browsers\...` or `%TEMP%\agent-browser-chrome-*`.
- Preserve `C:\Users\ADMIN\.agent-browser\.encryption-key` and unrelated saved session state.
- Disable Browser Harness recordings by default because the user has not opted in to recording page content.
- Do not modify HACOM application files until the environment smoke test reproduces a site defect.
- This workspace is not a Git repository, so replace commit steps with explicit verification checkpoints.

## Confirmed Baseline

- `agent-browser` installed: `0.33.2`; latest registry version: `0.34.0`.
- Node.js installed: `22.23.1`; `agent-browser@0.34.0` declares `node >=24.0.0`.
- Winget offers Node.js LTS `24.19.0` as `OpenJS.NodeJS.LTS`.
- The current shell runs as Administrator.
- Agent Browser's bundled Chrome launches child processes at a different integrity level; the parent exits with code `0` before Agent Browser observes `DevToolsActivePort`.
- The failed launches left 180 bundled-Chrome processes, 17 browser roots, 187 temporary profiles, and 125 `DevToolsActivePort` files.
- `browser-use` and `browser-harness` are absent; Python `3.12.10` and uv `0.11.32` are already available.
- The current official Browser Use local-control package is `browser-harness`; the legacy skill still invokes the name `browser-use`.

---

### Task 1: Clean Up Only Failed Agent Browser Runtime State

**Files:**
- Preserve: `C:\Users\ADMIN\.agent-browser\.encryption-key`
- Remove after path validation: `%TEMP%\agent-browser-chrome-*`

**Interfaces:**
- Consumes: the exact bundled Chrome path returned by Agent Browser doctor.
- Produces: no active bundled Agent Browser Chrome process and no orphaned Agent Browser temporary profile.

- [ ] **Step 1: Capture the failure before changing state**

Run:

```powershell
agent-browser.cmd doctor
agent-browser.cmd --session hacom-carousel session info --json
agent-browser.cmd --session hacom-carousel-headed session info --json
```

Expected: doctor reports `Chrome exited early ... without writing DevToolsActivePort`; both named daemons report `browserLaunched: false`.

- [ ] **Step 2: Close only the two known failed daemons**

Run:

```powershell
agent-browser.cmd --session hacom-carousel close
agent-browser.cmd --session hacom-carousel-headed close
```

Expected: both session PIDs disappear; no normal Google Chrome process is affected.

- [ ] **Step 3: Resolve and verify the bundled Chrome target before stopping leftovers**

Run:

```powershell
$agentChrome = (Resolve-Path 'C:\Users\ADMIN\.agent-browser\browsers\chrome-151.0.7922.71\chrome.exe').Path
$userChrome = (Resolve-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe').Path
if ($agentChrome -eq $userChrome) { throw 'Refusing to target the user Chrome installation.' }
$agentProcesses = Get-CimInstance Win32_Process | Where-Object { $_.ExecutablePath -eq $agentChrome }
$agentProcesses | Select-Object ProcessId, ExecutablePath, CommandLine
```

Expected: every selected process uses the bundled Agent Browser executable, never `C:\Program Files\Google\Chrome\...`.

- [ ] **Step 4: Stop the verified leftover process tree**

Run:

```powershell
$agentProcesses | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 500
if (Get-CimInstance Win32_Process | Where-Object { $_.ExecutablePath -eq $agentChrome }) {
  throw 'A bundled Agent Browser Chrome process is still running.'
}
```

Expected: zero remaining process uses the bundled Agent Browser Chrome path.

- [ ] **Step 5: Validate and remove only orphaned temporary profiles**

Run:

```powershell
$tempRoot = [IO.Path]::GetFullPath($env:TEMP).TrimEnd('\') + '\'
$orphanProfiles = Get-ChildItem -Directory $tempRoot -Filter 'agent-browser-chrome-*'
foreach ($profile in $orphanProfiles) {
  $resolved = [IO.Path]::GetFullPath($profile.FullName)
  if (-not $resolved.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove path outside temp: $resolved"
  }
}
$orphanProfiles | Remove-Item -Recurse -Force
```

Expected: the selected temporary profiles are deleted permanently; the user's normal Chrome profile and Agent Browser encryption key remain intact.

- [ ] **Step 6: Record the cleanup checkpoint**

Run:

```powershell
$remaining = Get-CimInstance Win32_Process | Where-Object { $_.ExecutablePath -eq $agentChrome }
$remainingProfiles = Get-ChildItem -Directory $tempRoot -Filter 'agent-browser-chrome-*'
if ($remaining.Count -ne 0 -or $remainingProfiles.Count -ne 0) { throw 'Cleanup incomplete.' }
```

Expected: checkpoint passes.

---

### Task 2: Upgrade the Supported Node and Agent Browser Toolchain

**Files:**
- Modify globally: Node.js LTS installation
- Modify globally: npm package `agent-browser`
- Modify: Agent Browser bundled Chrome cache through the official installer

**Interfaces:**
- Consumes: Winget and npm registry access.
- Produces: Node `24.x`, Agent Browser `0.34.0`, and a verified browser binary.

- [ ] **Step 1: Upgrade Node.js to the required LTS line**

Run:

```powershell
winget upgrade --id OpenJS.NodeJS.LTS --exact --accept-source-agreements --accept-package-agreements
```

If Winget reports that the LTS package is not installed, run:

```powershell
winget install --id OpenJS.NodeJS.LTS --exact --accept-source-agreements --accept-package-agreements
```

Expected after opening a fresh PowerShell process: `node --version` reports `v24.19.0` or a later `v24.x` release.

- [ ] **Step 2: Verify HACOM's existing Node commands before proceeding**

Run:

```powershell
node --version
npm.cmd --version
npm.cmd test
npm.cmd run build
npm.cmd run verify
```

Expected: Node is `24.x`; all existing project checks pass.

- [ ] **Step 3: Upgrade Agent Browser and reinstall its managed Chrome**

Run:

```powershell
npm.cmd install --global agent-browser@0.34.0
agent-browser.cmd install
```

Expected: `agent-browser.cmd --version` reports `0.34.0` and the installer completes without a missing-browser error.

- [ ] **Step 4: Run repair and quick diagnostics without opening a page**

Run:

```powershell
agent-browser.cmd doctor --fix
agent-browser.cmd doctor --offline --quick
```

Expected: environment, binary, daemon-state, and security checks pass. The later dedicated-CDP test is the authoritative launch verification because the current Codex shell remains elevated.

---

### Task 3: Add a Medium-Integrity Dedicated Chrome Lifecycle

**Files:**
- Create: `scripts/browser-automation.ps1`
- Runtime state: `%LOCALAPPDATA%\HACOM\BrowserAutomation\Profile`

**Interfaces:**
- Consumes: action `Start`, `Status`, or `Stop`.
- Produces: a dedicated Chrome endpoint at `http://127.0.0.1:9333` and JSON status containing `ready`, `cdpUrl`, `profilePath`, and matching process IDs.

- [ ] **Step 1: Write the lifecycle script with exact target guards**

Create `scripts/browser-automation.ps1` with this behavior:

```powershell
[CmdletBinding()]
param([ValidateSet('Start', 'Status', 'Stop')][string]$Action = 'Status')

$chromePath = (Resolve-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe').Path
$profilePath = Join-Path $env:LOCALAPPDATA 'HACOM\BrowserAutomation\Profile'
$cdpPort = 9333
$cdpUrl = "http://127.0.0.1:$cdpPort"
$taskName = 'HACOM-Browser-Automation-Start'

function Get-AutomationProcesses {
  Get-CimInstance Win32_Process | Where-Object {
    $_.ExecutablePath -eq $chromePath -and
    $_.CommandLine -like '*--user-data-dir=*HACOM\BrowserAutomation\Profile*'
  }
}

function Test-Cdp {
  try {
    $null = Invoke-RestMethod -Uri "$cdpUrl/json/version" -TimeoutSec 1
    return $true
  } catch { return $false }
}

if ($Action -eq 'Start') {
  New-Item -ItemType Directory -Force -Path $profilePath | Out-Null
  if ((Test-Cdp) -and -not (Get-AutomationProcesses)) {
    throw 'Port 9333 belongs to a browser outside the dedicated HACOM profile.'
  }
  if (-not (Test-Cdp)) {
    $taskCommand = '"' + $chromePath + '" --remote-debugging-address=127.0.0.1 --remote-debugging-port=' + $cdpPort + ' --user-data-dir="' + $profilePath + '" --no-first-run about:blank'
    $startTime = (Get-Date).AddMinutes(1).ToString('HH:mm')
    schtasks.exe /Create /TN $taskName /TR $taskCommand /SC ONCE /ST $startTime /RL LIMITED /IT /F | Out-Null
    schtasks.exe /Run /TN $taskName | Out-Null
    schtasks.exe /Delete /TN $taskName /F | Out-Null
    $deadline = [DateTime]::UtcNow.AddSeconds(15)
    while (-not (Test-Cdp) -and [DateTime]::UtcNow -lt $deadline) { Start-Sleep -Milliseconds 250 }
  }
  if (-not (Test-Cdp)) { throw 'Dedicated Chrome did not expose CDP on localhost:9333.' }
}

if ($Action -eq 'Stop') {
  Get-AutomationProcesses | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
}

[PSCustomObject]@{
  ready = Test-Cdp
  cdpUrl = $cdpUrl
  profilePath = $profilePath
  processIds = @((Get-AutomationProcesses).ProcessId)
} | ConvertTo-Json -Compress
```

- [ ] **Step 2: Verify start fails safely if another program owns port 9333**

Before starting Chrome, resolve `http://127.0.0.1:9333/json/version`. If it responds but its browser process does not contain the dedicated `--user-data-dir` argument, the implementation must stop with an ownership error instead of attaching to it.

Expected: the script never takes control of an unrelated browser endpoint.

- [ ] **Step 3: Start and inspect the dedicated browser**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Start
Invoke-RestMethod http://127.0.0.1:9333/json/version
```

Expected: JSON reports `ready:true`; the browser endpoint responds and the matching Chrome command line uses the dedicated profile.

- [ ] **Step 4: Prove Agent Browser can attach without launching Chrome**

Run:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 --pin-tab open file:///D:/hacom-new/index.html
agent-browser.cmd --session hacom-local --cdp 9333 get title
agent-browser.cmd --session hacom-local --cdp 9333 get url
```

Expected: title is `HACOM - PC, LAPTOP, Thiết Bị Chơi Game hàng đầu Việt Nam`; URL begins with `file:///D:/hacom-new/index.html`; no additional temporary Chrome profile is created.

---

### Task 4: Install Browser Harness and Preserve the `browser-use` Command Contract

**Files:**
- Install through uv: `browser-harness`
- Create: `C:\Users\ADMIN\.local\bin\browser-use.cmd`
- Create or refresh: `C:\Users\ADMIN\.codex\skills\browser-harness\SKILL.md`

**Interfaces:**
- Consumes: `BU_CDP_URL=http://127.0.0.1:9333`.
- Produces: working `browser-harness` and `browser-use` commands that connect to the dedicated browser.

- [ ] **Step 1: Install the official Browser Harness package**

Run:

```powershell
uv tool install --python 3.12 --upgrade --force browser-harness
browser-harness --version
```

Expected: `browser-harness` resolves from uv's user bin directory and prints a version.

- [ ] **Step 2: Disable recordings unless the user explicitly opts in later**

Run:

```powershell
browser-harness recordings disable
browser-harness telemetry disable
```

Expected: recording status shows config `disabled`; telemetry is disabled.

- [ ] **Step 3: Add the compatibility command used by the existing Browser Use skill**

Create `C:\Users\ADMIN\.local\bin\browser-use.cmd` with:

```bat
@echo off
browser-harness.exe %*
```

Expected: `where.exe browser-use` resolves this file and `browser-use --version` matches `browser-harness --version`.

- [ ] **Step 4: Refresh the local Browser Harness skill from the installed version**

Run `browser-harness skill`, capture the complete output, and save that exact content to `C:\Users\ADMIN\.codex\skills\browser-harness\SKILL.md` using an approved file-writing mechanism.

Expected: the skill documents commands matching the installed CLI version; do not edit bundled plugin caches.

- [ ] **Step 5: Diagnose and connect Browser Harness to the dedicated CDP endpoint**

Run:

```powershell
$env:BU_CDP_URL = 'http://127.0.0.1:9333'
browser-use --doctor
@'
print(page_info())
'@ | browser-use
```

Expected: doctor reports a live daemon/CDP connection and `page_info()` returns the HACOM tab rather than an internal Chrome page.

---

### Task 5: Real-Browser Acceptance Test on the HACOM Carousel

**Files:**
- Inspect: `index.html`
- Inspect: `assets/carousel.js`
- Modify only if a browser defect is reproduced: `index.html`, `assets/carousel.js`, `assets/app.js`, or `assets/styles.css`
- Test: `tests/carousel.test.mjs`

**Interfaces:**
- Consumes: dedicated Chrome on CDP `9333`, initialized elements matching `[data-carousel-root]`.
- Produces: browser evidence that auto-slide and Previous/Next controls change the leading original carousel index without Console errors.

- [ ] **Step 1: Capture Console and page errors before interaction**

Run:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 console --clear
agent-browser.cmd --session hacom-local --cdp 9333 errors --clear
agent-browser.cmd --session hacom-local --cdp 9333 reload
agent-browser.cmd --session hacom-local --cdp 9333 wait --load domcontentloaded
agent-browser.cmd --session hacom-local --cdp 9333 console
agent-browser.cmd --session hacom-local --cdp 9333 errors
```

Expected: no JavaScript exception prevents `window.HacomCarousel` or carousel initialization.

- [ ] **Step 2: Assert all carousel roots initialized**

Run:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 eval "({roots:document.querySelectorAll('[data-carousel-root]').length,initialized:[...document.querySelectorAll('[data-carousel-root]')].filter(root=>root.getAttribute('aria-roledescription')==='carousel').length,engine:typeof window.HacomCarousel?.initInfiniteCarousel})"
```

Expected: `roots` equals `initialized` and `engine` is `function`.

- [ ] **Step 3: Click Next on Shop by Category and verify state change**

Read the first category item's `data-carousel-index`, click the section's `data-carousel-next` button through Agent Browser, wait for the transform transition, and read the value again.

Run, scoped to the section whose heading is `Shop by Category`:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 eval "(()=>{const section=[...document.querySelectorAll('section')].find(node=>node.querySelector('h2')?.textContent.includes('Shop by Category'));return section?.querySelector('[data-carousel-track] > *')?.dataset.carouselIndex})()"
agent-browser.cmd --session hacom-local --cdp 9333 find role button click --name "Next"
agent-browser.cmd --session hacom-local --cdp 9333 wait 550
agent-browser.cmd --session hacom-local --cdp 9333 eval "(()=>{const section=[...document.querySelectorAll('section')].find(node=>node.querySelector('h2')?.textContent.includes('Shop by Category'));return section?.querySelector('[data-carousel-track] > *')?.dataset.carouselIndex})()"
```

Expected: the leading index advances exactly one logical item and the track returns to transform `0` after DOM rotation.

- [ ] **Step 4: Click Previous and verify wrap behavior**

Click the matching `data-carousel-prev` button, wait for the transition, and assert the leading original index returns to its previous value. Repeat from original index `0` and expect the last original index.

Expected: Previous never becomes disabled while content overflows; wrap does not expose blank space.

- [ ] **Step 5: Verify auto-slide after a full idle delay**

Move focus and pointer outside the carousel, record its leading index, wait `3500ms`, and read it again.

Expected: the index changes once; animation time is not counted as part of the three-second idle period.

- [ ] **Step 6: Repeat one state assertion through Browser Harness**

With `BU_CDP_URL` still pointing at the dedicated Chrome, call `page_info()`, capture a screenshot, click one visible Next/Previous control, and inspect the same `data-carousel-index` using `js(...)`.

Expected: both tools control the same dedicated browser successfully.

- [ ] **Step 7: Fix only defects reproduced in the renderer**

If any assertion fails, add the smallest failing unit/static test first, apply the minimal HACOM source change, and repeat Steps 1–6. Do not alter the carousel design or timing requirements while repairing runtime behavior.

- [ ] **Step 8: Run the complete project verification**

Run:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run verify
node --check assets/carousel.js
node --check assets/app.js
```

Expected: all checks pass.

---

### Task 6: Shut Down Cleanly and Verify No Resource Leak

**Files:**
- Runtime only: dedicated browser process and Agent Browser daemon

**Interfaces:**
- Consumes: session `hacom-local` and lifecycle action `Stop`.
- Produces: no automation daemon, no dedicated Chrome process, and no newly leaked `%TEMP%\agent-browser-chrome-*` profiles.

- [ ] **Step 1: Close the attached Agent Browser session**

Run:

```powershell
agent-browser.cmd --session hacom-local close
```

Expected: the daemon closes without terminating the user's normal Chrome.

- [ ] **Step 2: Stop only the dedicated automation profile**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Stop
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Status
```

Expected: status reports `ready:false` and an empty `processIds` array.

- [ ] **Step 3: Verify leak-free completion**

Run:

```powershell
Get-ChildItem -Directory $env:TEMP -Filter 'agent-browser-chrome-*'
Get-CimInstance Win32_Process | Where-Object {
  $_.CommandLine -like '*HACOM\BrowserAutomation\Profile*' -or
  $_.ExecutablePath -like 'C:\Users\ADMIN\.agent-browser\browsers\*'
}
```

Expected: no new Agent Browser temporary profile and no HACOM automation browser process remains.

## Self-Review Result

- Spec coverage: both reported environment failures are addressed independently and then verified together against the original carousel task.
- Safety coverage: the plan avoids `--no-sandbox`, elevated Chrome, the user's primary profile, broad process termination, and broad recursive deletion.
- Version consistency: Node `24.x` satisfies Agent Browser `0.34.0`; Python `3.12` satisfies the Browser Harness install path; both clients consume the verified CDP port `9333`.
- Placeholder scan: no unresolved implementation marker remains.
- Repository constraint: no commit steps are included because `D:\hacom-new` is not a Git repository.
