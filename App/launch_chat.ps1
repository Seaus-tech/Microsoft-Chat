Add-Type -AssemblyName PresentationFramework, System.Windows.Forms

# 📂 Identify repository paths
$repoDir = $PSScriptRoot
$winFormsDll = Join-Path $repoDir "Microsoft.Web.WebView2.WinForms.dll"
$loaderDll = Join-Path $repoDir "WebView2Loader.dll"

# Inject the repository directory containing WebView2Loader.dll into the process path env
if (Test-Path $loaderDll) {
    $currentPath = [System.Environment]::GetEnvironmentVariable("PATH", "Process")
    [System.Environment]::SetEnvironmentVariable("PATH", "$repoDir;$currentPath", "Process")
}
else {
    [System.Windows.Forms.MessageBox]::Show("Could not find WebView2Loader.dll in the App directory.", "Missing DLL")
    Exit
}

# Bind to the primary WinForms wrapper assembly
if (Test-Path $winFormsDll) {
    [System.Reflection.Assembly]::LoadFrom($winFormsDll) | Out-Null
}
else {
    [System.Windows.Forms.MessageBox]::Show("Could not find Microsoft.Web.WebView2.WinForms.dll in the App directory.", "Missing DLL")
    Exit
}

# Explicitly formatted clean consumer URL parameters
$targetUrl = "https://live.com"
$cacheDir = Join-Path $repoDir "ChatCache"

# Build native Windows Form layout frame
$form = New-Object System.Windows.Forms.Form
$form.Text = "Chat"
$form.Width = 420
$form.Height = 680
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedSingle"
$form.MaximizeBox = $false

# Initialize the Native Chromium WebView2 Engine
$webView = New-Object Microsoft.Web.WebView2.WinForms.WebView2
$webView.Dock = "Fill"

# Apply explicit non-admin environment creation parameters
$envTask = [Microsoft.Web.WebView2.Core.CoreWebView2Environment]::CreateAsync($null, $cacheDir)
$webView.EnsureCoreWebView2Async($envTask.GetAwaiter().GetResult()) | Out-Null

while (-not $webView.CoreWebView2) {
    [System.Windows.Forms.Application]::DoEvents()
    Start-Sleep -Milliseconds 50
}

# 🌐 FORCE AGENT IDENTITY (Prevents the server redirect to Outlook)
$edgeAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
$webView.CoreWebView2.Settings.UserAgent = $edgeAgent

# Apply UI Layout locks
$webView.CoreWebView2.Settings.IsZoomControlEnabled = $false
$webView.CoreWebView2.Settings.IsStatusBarEnabled = $false
$webView.CoreWebView2.Settings.AreDevToolsEnabled = $false
$webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = $false

# Launch navigation string
$webView.Source = New-Object System.Uri($targetUrl)

# Render on screen
$form.Controls.Add($webView)
[System.Windows.Forms.Application]::Run($form)
