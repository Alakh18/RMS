$loginBody = @{
    email = "admin@rentaleco.com"
    password = "admin123"
} | ConvertTo-Json

Write-Host "Logging in as admin..."

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $loginBody -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Login successful!"
    Write-Host $response.Content
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
