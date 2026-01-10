# Windows PowerShell script to trigger the campaign
$PROJECT_REF = "pshjpksmzvwyzugrbmiu"
$FUNCTION_NAME = "campaign-orchestrator"
$ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGpwa3NtenZ3eXp1Z3JibWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1ODk5MDUsImV4cCI6MjA4MzE2NTkwNX0.HA4w-ULKS1XSy2IiW8vyfcoPHXDM5qVp6MPYoDe490g"
$URL = "https://$PROJECT_REF.supabase.co/functions/v1/$FUNCTION_NAME"

Write-Host "Triggering Campaign Orchestrator at $URL..."

try {
    $headers = @{ 
        "Authorization" = "Bearer $ANON_KEY"
        "Content-Type" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri $URL -Method Post -Headers $headers
    
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5)
}
catch {
    Write-Host "Error triggering function:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
}

