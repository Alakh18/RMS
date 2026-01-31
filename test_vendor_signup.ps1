$body = @{
    email = "vendor@test.com"
    password = "vendor123"
    firstName = "Test"
    lastName = "Vendor"
    role = "VENDOR"
    companyName = "Test Vendor Co"
    gstin = "07AABCT1234H1Z0"
    productCategory = "Photography Equipment"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/signup" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
    Write-Host "✅ Vendor created successfully!"
    Write-Host $response.Content
} catch {
    Write-Host "Error during signup:"
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
        $reader.Close()
    }
}
