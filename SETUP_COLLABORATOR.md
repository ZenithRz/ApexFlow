# GitHub Setup Instructions

You are working on the ApexFlow project. Follow these steps to connect to GitHub.

## Step 1: Check if GitHub CLI is installed
Run this command:
```
gh --version
```
If it says "not recognized", install it:
```
winget install --id GitHub.cli --source winget --accept-package-agreements --accept-source-agreements
```
If winget fails, download manually:
```
$url = "https://github.com/cli/cli/releases/download/v2.67.0/gh_2.67.0_windows_amd64.zip"
$zip = "$env:TEMP\gh.zip"
$dest = "$env:USERPROFILE\.gh-cli"
Invoke-WebRequest -Uri $url -OutFile $zip
Expand-Archive -Path $zip -DestinationPath $dest -Force
$env:Path += ";$env:USERPROFILE\.gh-cli\bin"
```

## Step 2: Login to GitHub
Run:
```
gh auth login
```
Then choose:
1. **GitHub.com**
2. **HTTPS**
3. **Y**
4. **Login with a web browser**
5. Copy the code → open the link in browser → paste the code → authorize

## Step 3: Clone the project
```
git clone https://github.com/ZenithRz/ApexFlow.git
cd ApexFlow
npm install
```

## Step 4: Verify connection
```
git status
gh auth status
```
Both should show successful output.

## Step 5: Read collaboration rules
```
Read the file AGENT_INSTRUCTIONS.md in the project root and follow the instructions exactly.
```

## Important Rules:
- Always run `git pull` before making changes
- Never push directly to `main`
- Read `AGENT_SYNC.md` before every session
- Use branches for your work: `git checkout -b feature/your-task-name`
