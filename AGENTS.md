# Workspace Notes

- PowerShell may block `npm.ps1` locally because of execution policy. When running npm scripts in this workspace, prefer `cmd /c npm run <script>` instead of calling `npm` directly in PowerShell.
