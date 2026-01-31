$token = Get-Content "e:\AAYUSH\RMS 1\RMS\vendor_token.txt"

$productBody = @{
    name = "Sony FX6 Test"
    description = "Test camera"
    brand = "Sony"
    pricingType = "DAILY"
    price = 145.50
    securityDeposit = 500
    quantity = 2
    isRentable = $true
    isPublished = $true
    attributes = @(
        @{ name = "Color"; value = "Black" }
    )
} | ConvertTo-Json -Depth 10

Write-Host "Creating simple product without images..."

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/vendor/products" `
        -Method Post `
        -Headers @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -Body $productBody `
        -UseBasicParsing `
        -ErrorAction Stop
    
    Write-Host "✅ Product created successfully!"
    $json = $response.Content | ConvertFrom-Json
    Write-Host "Product ID: $($json.data.id)"
    Write-Host "Name: $($json.data.name)"
    Write-Host "VendorId: $($json.data.vendorId)"
} catch {
    Write-Host "❌ Error creating product:"
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
    }
}
