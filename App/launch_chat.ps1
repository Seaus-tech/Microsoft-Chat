Add-Type -AssemblyName PresentationFramework, System.Windows.Forms

# Dynamically discover the current repository path
$repoDir = $PSScriptRoot
$configFile = Join-Path $repoDir "config.json"
$cacheDir = Join-Path $repoDir "ChatCache"

# Load Configurations
$config = Get-Content -Raw -Path $configFile | ConvertFrom-Json

# Build a native Windows Form frame
$form = New-Object System.Windows.Forms.Form
$form.Text = $config.title
$form.Width = $config.width
$form.Height = $config.height
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedSingle"
$form.MaximizeBox = $false

# Initialize the Native Chromium WebView2 Engine
$webView = New-Object Microsoft.Web.WebView2.WinForms.WebView2
$webView.Dock = "Fill"

# Force WebView2 to use the isolated local repository cache path
$envPath = [Microsoft.Web.WebView2.Core.CoreWebView2Environment]::CreateAsync($null, $cacheDir)
$task = $webView.EnsureCoreWebView2Async($envPath.Result)

# Wait briefly for WebView2 to spin up in memory
while (-not $webView.CoreWebView2) {
    [System.Windows.Forms.Application]::DoEvents()
    Start-Sleep -Milliseconds 50
}

# Apply Native UI Restrictions
$webView.CoreWebView2.Settings.IsZoomControlEnabled = $false
$webView.CoreWebView2.Settings.IsStatusBarEnabled = $false
$webView.CoreWebView2.Settings.AreDevToolsEnabled = $false
$webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = $false

# Navigate directly to the original Microsoft Teams consumer core 
$webView.Source = New-Object System.Uri($config.url)

# Render everything on screen
$form.Controls.Add($webView)
[System.Windows.Forms.Application]::Run($form)
