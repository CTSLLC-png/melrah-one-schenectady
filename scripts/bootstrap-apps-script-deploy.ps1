$ErrorActionPreference = 'Stop'

$repo = 'CTSLLC-png/melrah-one-schenectady'
Write-Host 'ONE SCHENECTADY Apps Script deployment bootstrap' -ForegroundColor Cyan

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI (gh) is required. Install it from https://cli.github.com/ and run gh auth login once.'
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'Node.js/npm is required. Install Node.js LTS, then rerun this script.'
}

Write-Host 'Installing current clasp CLI...'
npm install --global '@google/clasp@3.4.0'

Write-Host 'Opening Google Apps Script API user setting. Turn the API ON if it is not already enabled.'
Start-Process 'https://script.google.com/home/usersettings'
Read-Host 'Press Enter after the Apps Script API is enabled'

Write-Host 'Signing into Google for clasp. Complete the browser authorization.'
clasp login

$authPath = Join-Path $HOME '.clasprc.json'
if (-not (Test-Path $authPath)) {
  throw "clasp login completed but $authPath was not found."
}

$projectInput = Read-Host 'Paste the Apps Script editor URL (https://script.google.com/home/projects/SCRIPT_ID/edit) or paste only the SCRIPT_ID'
if ($projectInput -match '/projects/([^/]+)/') {
  $scriptId = $Matches[1]
} else {
  $scriptId = $projectInput.Trim()
}
if ([string]::IsNullOrWhiteSpace($scriptId)) {
  throw 'Apps Script SCRIPT_ID could not be determined.'
}

Write-Host 'Storing OAuth authorization securely as GitHub Actions secret CLASPRC_JSON...'
Get-Content -Raw $authPath | gh secret set CLASPRC_JSON --repo $repo

Write-Host 'Storing Apps Script project ID securely as GitHub Actions secret APPS_SCRIPT_ID...'
$scriptId | gh secret set APPS_SCRIPT_ID --repo $repo

Write-Host 'Starting autonomous Apps Script deployment workflow...'
gh workflow run 'deploy-apps-script.yml' --repo $repo

Write-Host ''
Write-Host 'Bootstrap complete.' -ForegroundColor Green
Write-Host 'GitHub now has the credentials it needs to push apps-script/Code.gs and update the existing production web-app deployment.'
Write-Host 'Future changes under apps-script/ on main will deploy automatically.'
