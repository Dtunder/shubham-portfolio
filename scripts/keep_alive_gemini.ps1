param (
    [string]$Prompt = "Recherche und Analyse fortsetzen",
    [string]$CliProfile = "gemini6",
    [int]$MaxAttempts = 20,
    [int]$BaseDelay = 30
)

Write-Host "=== CYBERNETIC GEMINI CLI MONITOR ===" -ForegroundColor Cyan
Write-Host "Target Profile: $CliProfile" -ForegroundColor Gray
Write-Host "Prompt: $Prompt" -ForegroundColor Gray
Write-Host "Monitoring started. Will auto-restart on crashes or quota limits." -ForegroundColor Gray
Write-Host "=====================================" -ForegroundColor Cyan

$attempt = 1
$success = $false

while ($attempt -le $MaxAttempts) {
    Write-Host "[Attempt $attempt/$MaxAttempts] Executing command..." -ForegroundColor Yellow
    
    # Run the CLI and capture exit status
    $startTime = Get-Date
    
    # We call the CLI command directly
    & $CliProfile -p "$Prompt" --approval-mode auto_edit --skip-trust
    
    # Check the built-in PowerShell exit status variable
    $exitCode = $LASTEXITCODE
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    if ($exitCode -eq 0) {
        Write-Host "Success! Command finished successfully in $duration seconds." -ForegroundColor Green
        $success = $true
        break
    } else {
        Write-Host "Warning: Command crashed or was rate-limited (Exit Code: $exitCode) after $duration seconds." -ForegroundColor Red
        
        # Exponential Backoff to let quotas or network cool down
        $delay = $BaseDelay * [math]::Pow(1.5, ($attempt - 1))
        # Cap max delay to 10 minutes
        if ($delay -gt 600) { $delay = 600 }
        
        $roundedDelay = [math]::Round($delay)
        Write-Host "Backoff: Sleeping for $roundedDelay seconds before auto-restarting..." -ForegroundColor Gray
        Start-Sleep -Seconds $roundedDelay
        $attempt++
    }
}

if (-not $success) {
    Write-Error "Error: Gemini CLI failed consistently across all $MaxAttempts attempts."
}
