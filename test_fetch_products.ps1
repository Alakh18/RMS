$token = Get-Content "e:\AAYUSH\RMS 1\RMS\vendor_token.txt"

Write-Host "Fetching vendor products..."

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/vendor/products" `
        -Method Get `
        -Headers @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -UseBasicParsing `
        -ErrorAction Stop
    
    Write-Host "✅ Products fetched successfully!"
    $json = $response.Content | ConvertFrom-Json
    Write-Host "Total products: $($json.data.Count)"
    foreach ($product in $json.data) {
        Write-Host ""
        Write-Host "Product ID: $($product.id)"
        Write-Host "Name: $($product.name)"
        Write-Host "VendorId: $($product.vendorId)"
        Write-Host "Price: ₹$($product.price)"
        Write-Host "Images count: $($product.images.Count)"
        Write-Host "Attributes count: $($product.attributes.Count)"
    }
} catch {
    Write-Host "❌ Error fetching products:"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Response: $errorContent"
    }
}
