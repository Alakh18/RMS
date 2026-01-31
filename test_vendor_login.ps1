$loginBody = @{
    email = "simplevendor@test.com"
    password = "vendor123"
} | ConvertTo-Json

Write-Host "Logging in as vendor..."

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $loginBody -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Login successful!"
    $json = $response.Content | ConvertFrom-Json
    Write-Host "Token: $($json.token)"
    Write-Host "User ID: $($json.user.id)"
    Write-Host "Role: $($json.user.role)"
    
    # Save token for next test
    $json.token | Out-File -FilePath "e:\AAYUSH\RMS 1\RMS\vendor_token.txt" -NoNewline
    Write-Host "`nToken saved to file for next test"
} catch {
    Write-Host "Login failed:"
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
    }
}
