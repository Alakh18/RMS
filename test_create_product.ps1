$token = Get-Content "e:\AAYUSH\RMS 1\RMS\vendor_token.txt"

$productBody = @{
    name = "Sony FX6 Cinema Line"
    description = "Professional Full-frame Camera with 4K capabilities"
    brand = "Sony"
    pricingType = "DAILY"
    price = 145.50
    securityDeposit = 500
    quantity = 2
    isRentable = $true
    isPublished = $true
    attributes = @(
        @{ name = "Color"; value = "Black" },
        @{ name = "Resolution"; value = "4K" }
    )
    images = @(
        @{ 
            url = "https://via.placeholder.com/400x300?text=Sony+FX6"
            altText = "Sony FX6 Cinema Camera"
            isPrimary = $true
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "Creating product as vendor..."
Write-Host "Token: $($token.Substring(0,20))..."

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
    Write-Host "Response:"
    $json | ConvertTo-Json -Depth 5 | Write-Host
} catch {
    Write-Host "❌ Error creating product:"
    Write-Host "Status: $($_.Exception.Response.StatusCode)"
    Write-Host "Message: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
    }
}
