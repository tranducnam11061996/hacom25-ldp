# Browser Automation Rules

These rules are designed to be copied to the root of other Windows web projects.

## Required architecture

- Browser automation must use a dedicated Chrome profile. Never reuse the user's default Chrome profile.
- Chrome DevTools Protocol must bind to loopback only (`127.0.0.1`). Never expose CDP to the LAN.
- The CDP port must be checked for ownership before use. Do not assume `9222` is available; this template uses `9333`.
- When the calling shell is elevated, launch Chrome at medium integrity and attach tools through CDP. Do not let the elevated tool spawn Chrome directly.
- Never use `--no-sandbox` as a Windows launch workaround.
- Use one named Agent Browser session per task or project. Do not rely on the default session for repeatable tests.
- Keep Browser Harness recordings disabled unless the user explicitly requests recording and accepts that page content may be stored locally.

## Toolchain requirements

- Node.js: supported LTS version satisfying the installed Agent Browser package. Current baseline: Node `24.x`.
- Agent Browser: `0.34.0` or newer compatible release.
- Python: `3.12.x`.
- Browser Harness: install with `uv tool install --python 3.12 --upgrade --force browser-harness`.
- On PowerShell systems that block npm `.ps1` shims, invoke `npm.cmd`, `npx.cmd`, and `agent-browser.cmd`.
- If an existing workflow calls `browser-use`, provide a `.cmd` alias that forwards to `browser-harness.exe`; do not install an unrelated package with the same name.

## Safe launch rules

1. Resolve the exact Chrome executable and dedicated profile path.
2. Probe `http://127.0.0.1:<port>/json/version`.
3. If the endpoint responds, verify its owning process contains the dedicated `--user-data-dir` argument.
4. Refuse to attach when ownership cannot be proved.
5. Launch Chrome with:

   ```text
   --remote-debugging-address=127.0.0.1
   --remote-debugging-port=<verified-port>
   --user-data-dir=<dedicated-profile>
   --no-first-run
   ```

6. Wait for `/json/version` before starting an automation client.

## Test rules

- Open the exact URL requested by the user. For local static projects, verify the `file:///` URL rather than silently replacing it with localhost.
- Check `document.readyState`, page title, Console messages, and uncaught page errors before clicking.
- Verify interaction through state, not appearance alone. For a carousel, compare the leading item identifier before and after clicking.
- Re-snapshot after navigation or DOM replacement because Agent Browser refs become stale.
- For animation tests, wait longer than the declared transition but do not count animation time as idle time.
- Run mobile and desktop viewport checks when pointer/touch behavior is in scope.
- Keep unit/static tests and browser smoke tests separate; both must pass.

## Cleanup rules

- Close the named Agent Browser session after the test.
- Stop only processes whose command line contains the dedicated automation profile path.
- Never kill all system Chrome processes.
- Delete only verified orphan profiles under `%TEMP%\agent-browser-chrome-*`; resolve every absolute path and confirm it remains under `%TEMP%` before recursive deletion.
- Preserve Agent Browser encryption keys and saved state unless the user explicitly requests their removal.
- After cleanup, verify there is no listener on the project CDP port and no matching automation process.

## Failure rules

- `Chrome exited early ... DevToolsActivePort`: check elevation mismatch, stale daemons, supported Node/Agent Browser versions, and orphan Chrome processes before reinstalling.
- HTTP `404` from `/json/version`: treat it as a port ownership conflict, not a healthy CDP endpoint.
- Blank Agent Browser output: inspect `session info --json`, `tab`, `errors --json`, and `console --json`.
- `browser-use` missing: install official `browser-harness` and restore the compatibility alias.
- Do not add a second automation framework until the existing CDP path has been diagnosed.
