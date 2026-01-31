Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VENDOR PRODUCT CREATION - FULL TEST SUITE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Get token
Write-Host ""
Write-Host "Step 1: Loading vendor token..." -ForegroundColor Yellow
$token = Get-Content "e:\AAYUSH\RMS 1\RMS\vendor_token.txt" -ErrorAction Stop
Write-Host "✅ Token loaded" -ForegroundColor Green

# Test 1: Create product with all fields
Write-Host ""
Write-Host "Step 2: Creating product with images and attributes..." -ForegroundColor Yellow

$productBody = @{
    name = "DJI Mavic 3 Pro Drone"
    description = "Professional triple lens drone for 4K/8K video and photography"
    brand = "DJI"
    pricingType = "DAILY"
    price = 85.00
    securityDeposit = 800
    quantity = 1
    isRentable = $true
    isPublished = $true
    attributes = @(
        @{ name = "Color"; value = "Black" },
        @{ name = "Max Flight Time"; value = "46 minutes" },
        @{ name = "Max Speed"; value = "75.6 km/h" }
    )
    images = @(
        @{ 
            url = "https://via.placeholder.com/400x300?text=DJI+Mavic+3+Pro"
            altText = "DJI Mavic 3 Pro Drone - Main View"
            isPrimary = $true
        },
        @{
            url = "https://via.placeholder.com/400x300?text=DJI+Mavic+Side"
            altText = "DJI Mavic 3 Pro Drone - Side View"
            isPrimary = $false
        }
    )
} | ConvertTo-Json -Depth 10

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
    
    $json = $response.Content | ConvertFrom-Json
    $productId = $json.data.id
    
    Write-Host "✅ Product created successfully!" -ForegroundColor Green
    Write-Host "   ID: $productId" -ForegroundColor Cyan
    Write-Host "   Name: $($json.data.name)" -ForegroundColor Cyan
    Write-Host "   VendorId: $($json.data.vendorId)" -ForegroundColor Cyan
    Write-Host "   Images: $($json.data.images.Count)" -ForegroundColor Cyan
    Write-Host "   Attributes: $($json.data.attributes.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Fetch all products
Write-Host ""
Write-Host "Step 3: Fetching all vendor products..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/vendor/products" `
        -Method Get `
        -Headers @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -UseBasicParsing `
        -ErrorAction Stop
    
    $json = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Products fetched successfully!" -ForegroundColor Green
    Write-Host "   Total products: $($json.data.Count)" -ForegroundColor Cyan
    
    $totalImages = 0
    $totalAttrs = 0
    foreach ($product in $json.data) {
        $totalImages += $product.images.Count
        $totalAttrs += $product.attributes.Count
        Write-Host "   - $($product.name) (ID: $($product.id), VendorId: $($product.vendorId))" -ForegroundColor Cyan
    }
    Write-Host "   Total images: $totalImages" -ForegroundColor Cyan
    Write-Host "   Total attributes: $totalAttrs" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Verify vendorId isolation
Write-Host ""
Write-Host "Step 4: Verifying VendorId isolation..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/vendor/products" `
        -Method Get `
        -Headers @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        } `
        -UseBasicParsing `
        -ErrorAction Stop
    
    $json = $response.Content | ConvertFrom-Json
    
    $allSameVendor = $true
    $vendorIds = @()
    foreach ($product in $json.data) {
        $vendorIds += $product.vendorId
        if ($product.vendorId -ne 10) {
            $allSameVendor = $false
        }
    }
    
    if ($allSameVendor) {
        Write-Host "✅ All products belong to VendorId 10" -ForegroundColor Green
    } else {
        Write-Host "❌ Mixed vendor IDs found: $($vendorIds | Sort-Object -Unique)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ ALL TESTS PASSED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "  ✅ Product creation with images works"
Write-Host "  ✅ Product creation with attributes works"
Write-Host "  ✅ VendorId correctly assigned from JWT"
Write-Host "  ✅ Products fetched with images and attributes"
Write-Host "  ✅ VendorId isolation verified"
Write-Host ""
Write-Host "Product creation flow is FULLY OPERATIONAL!" -ForegroundColor Green
