# Workspace Notes

- PowerShell may block `npm.ps1` locally because of execution policy. When running npm scripts in this workspace, prefer `cmd /c npm run <script>` instead of calling `npm` directly in PowerShell.
- The code fix is in. PowerShell blocked `npm.ps1` locally because of execution policy, so I'm switching to `cmd /c npm run build` to get the actual Next.js build result instead of stopping on the shell policy.
- `PLAN.md` is the living execution tracker. When meaningful work is completed or project direction changes, update `PLAN.md` statuses and completed/remaining items in the same pass.
- When a sprint item, phase item, or launch-readiness task is completed, mark it in `PLAN.md` during that same work session so the tracker always reflects what is truly done and what is still remaining.
- If a recurring workspace convention or execution note becomes important for future work, add or update it here in `AGENTS.md`.
- When adding public trust, legal, or monetization-related pages, also wire them into navigation/footer/sitemap and give them canonical metadata.
