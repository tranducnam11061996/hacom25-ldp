# Browser Automation Setup and Troubleshooting

This guide documents a reusable Windows setup for Agent Browser and Browser Harness without touching the user's normal Chrome profile.

## 1. Install the supported toolchain

```powershell
winget install --id OpenJS.NodeJS.LTS --exact --accept-source-agreements --accept-package-agreements
npm.cmd install --global agent-browser@0.34.0
agent-browser.cmd install
uv tool install --python 3.12 --upgrade --force browser-harness
browser-harness recordings disable
browser-harness telemetry disable
```

Verify:

```powershell
node --version
agent-browser.cmd --version
browser-harness --version
agent-browser.cmd doctor --offline --quick
```

## 2. Optional `browser-use` compatibility alias

Create `%USERPROFILE%\.local\bin\browser-use.cmd`:

```bat
@echo off
browser-harness.exe %*
```

Confirm `%USERPROFILE%\.local\bin` is on `PATH`:

```powershell
where.exe browser-use
browser-use.cmd --version
```

## 3. Start the isolated browser

From the project root:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Start
```

Expected output includes:

```json
{"ready":true,"owned":true,"cdpUrl":"http://127.0.0.1:9333"}
```

Check status at any time:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Status
Invoke-RestMethod http://127.0.0.1:9333/json/version
```

The script uses `%LOCALAPPDATA%\HACOM\BrowserAutomation\Profile`. When copying it to another project, rename the profile folder, task name, and Agent Browser session.

## 4. Use Agent Browser

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 --pin-tab open "file:///D:/hacom-new/index.html"
agent-browser.cmd --session hacom-local --cdp 9333 wait --load domcontentloaded
agent-browser.cmd --session hacom-local --cdp 9333 tab
agent-browser.cmd --session hacom-local --cdp 9333 snapshot -i -c
agent-browser.cmd --session hacom-local --cdp 9333 errors --json
agent-browser.cmd --session hacom-local --cdp 9333 console --json
```

Useful DOM check:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 eval "({title:document.title,readyState:document.readyState})" --json
```

## 5. Use Browser Harness

PowerShell:

```powershell
$env:BU_CDP_URL = 'http://127.0.0.1:9333'
@'
print(page_info())
'@ | browser-harness
```

The compatibility alias works identically:

```powershell
$env:BU_CDP_URL = 'http://127.0.0.1:9333'
@'
print(page_info())
'@ | browser-use.cmd
```

The first `browser-harness --doctor` may show no daemon because no connection has been created yet. Run one command, then repeat doctor; `daemon alive` and `active browser connections` should pass.

## 6. Test a carousel

1. Clear/inspect errors and reload the page.
2. Confirm every `[data-carousel-root]` was initialized.
3. Read the first visible item's stable identifier.
4. Click Next, wait for the transform duration, and read the identifier again.
5. Click Previous and verify the original identifier returns.
6. Move focus/pointer outside, wait longer than the auto-delay, and verify one automatic change.
7. Check Console and errors again.

Example initialization check:

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 eval "({roots:document.querySelectorAll('[data-carousel-root]').length,initialized:[...document.querySelectorAll('[data-carousel-root]')].filter(root=>root.getAttribute('aria-roledescription')==='carousel').length})" --json
```

## 7. Troubleshooting

### Chrome exits before DevToolsActivePort

Check whether the shell is elevated:

```powershell
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
```

If `True`, do not add `--no-sandbox`. Use the lifecycle script so Chrome launches with a limited interactive token, then attach with `--cdp`.

Also check:

```powershell
agent-browser.cmd close --all
agent-browser.cmd doctor --offline --quick
```

Use `close --all` only when no other Agent Browser task is active.

### `/json/version` returns 404

Another process owns the port. Inspect both IPv4 and IPv6 listeners:

```powershell
Get-NetTCPConnection -LocalPort 9333 -State Listen | Select-Object LocalAddress,OwningProcess
Get-CimInstance Win32_Process -Filter "ProcessId=<PID>" | Select-Object ExecutablePath,CommandLine
```

Change the dedicated port if ownership is not the expected profile. Never attach to an unknown endpoint.

### Agent Browser returns blank output

```powershell
agent-browser.cmd --session hacom-local --cdp 9333 session info --json
agent-browser.cmd --session hacom-local --cdp 9333 tab
agent-browser.cmd --session hacom-local --cdp 9333 errors --json
agent-browser.cmd --session hacom-local --cdp 9333 console --json
```

### Browser Harness doctor initially reports no daemon

Set `BU_CDP_URL`, run one `page_info()` command, then run doctor again. Do not repeatedly open Chrome remote-debugging permission prompts.

## 8. Stop and verify cleanup

```powershell
agent-browser.cmd --session hacom-local close
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Stop
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Status
```

Expected final state: `ready:false`, `owned:false`, and an empty `processIds` array. The user's normal Chrome remains open.

## Reuse in another project

Copy these files into the new project root:

- `AGENTS.md`
- `BROWSER_AUTOMATION_RULES.md`
- `BROWSER_AUTOMATION_GUIDE.md`
- `scripts/browser-automation.ps1`

Then change the dedicated profile name, Scheduled Task name, CDP port if necessary, and Agent Browser session name.
