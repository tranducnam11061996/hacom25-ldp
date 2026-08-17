# Project Agent Rules

## Browser automation

Before any task that opens, clicks, screenshots, or tests a web page, read:

- `BROWSER_AUTOMATION_RULES.md`
- `BROWSER_AUTOMATION_GUIDE.md`

Mandatory workflow on Windows:

1. Never launch an automation Chrome from an elevated shell and never add `--no-sandbox` to make it work.
2. Start the isolated browser with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\browser-automation.ps1 -Action Start`.
3. Use the returned CDP endpoint. This project uses `http://127.0.0.1:9333`; do not assume port `9222` is free.
4. For Agent Browser, always use a named session and attach explicitly: `agent-browser.cmd --session hacom-local --cdp 9333 ...`.
5. For Browser Harness, set `BU_CDP_URL=http://127.0.0.1:9333` and use `browser-harness` or the compatibility alias `browser-use`.
6. Inspect browser Console and page errors before changing application code.
7. Stop the named session and isolated browser after testing. Never terminate the user's normal Chrome profile.

If browser automation fails, run the diagnostics in `BROWSER_AUTOMATION_GUIDE.md` before installing another browser framework.
