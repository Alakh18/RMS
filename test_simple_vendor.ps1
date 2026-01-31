$signupBody = @{
    email = "simplevendor@test.com"
    password = "vendor123"
    confirmPassword = "vendor123"
    firstName = "Simple"
    lastName = "Vendor"
    role = "VENDOR"
} | ConvertTo-Json

Write-Host "Creating vendor..."
Write-Host "Body: $signupBody"

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/signup" -Method Post -Headers @{"Content-Type"="application/json"} -Body $signupBody -UseBasicParsing -ErrorAction Stop
    Write-Host "✅ Vendor created!"
    Write-Host $response.Content
} catch {
    Write-Host "Error: $($_.Exception.Response.StatusCode)"
    Write-Host "Message: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
    }
}
