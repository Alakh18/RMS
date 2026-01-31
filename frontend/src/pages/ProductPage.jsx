import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PRODUCTS_DB } from '../data/products'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('day')
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch product
    setLoading(true)
    setTimeout(() => {
      const productData = PRODUCTS_DB[id]
      if (productData) {
        setProduct(productData)
      } else {
        // Product not found, redirect to products page
        navigate('/products')
      }
      setLoading(false)
    }, 300)
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const getCurrentPrice = () => {
    let basePrice = 0
    switch (selectedPeriod) {
      case 'hour':
        basePrice = product.hourlyRate
        break
      case 'day':
        basePrice = product.dailyRate
        break
      case 'week':
        basePrice = product.weeklyRate
        break
      case 'month':
        basePrice = product.monthlyRate
        break
      default:
        basePrice = product.dailyRate
    }
    return basePrice + getVariantPrice()
  }

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0
    
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    
    let duration = 0
    switch (selectedPeriod) {
      case 'hour':
        duration = Math.ceil(diffTime / (1000 * 60 * 60))
        break
      case 'day':
        duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        break
      case 'week':
        duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
        break
      case 'month':
        duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
        break
      default:
        duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    return getCurrentPrice() * duration * quantity
  }

  const handleAddToCart = () => {
    if (!startDate || !endDate) {
      alert('Please select rental period')
      return
    }
    
    // If product has variants, open modal instead of adding directly
    if (product.hasVariants) {
      setShowVariantModal(true)
      return
    }
    
    addToCartDirectly()
  }

  const addToCartDirectly = () => {
    const orderData = {
      product,
      quantity,
      startDate,
      endDate,
      period: selectedPeriod,
      totalPrice: calculateTotalPrice(),
      selectedVariants: product.hasVariants ? selectedVariants : null
    }
    
    console.log('Adding to cart:', orderData)
    alert('Product added to cart successfully!')
    setShowVariantModal(false)
  }

  const handleVariantChange = (variantId, optionIndex) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: optionIndex
    }))
  }

  const getVariantPrice = () => {
    if (!product.hasVariants || !product.variants) return 0
    
    let additionalPrice = 0
    product.variants.forEach(variant => {
      const selectedOption = selectedVariants[variant.id]
      if (selectedOption !== undefined) {
        additionalPrice += variant.prices[selectedOption]
      }
    })
    return additionalPrice
  }

  const handleAddToWishlist = () => {
    alert('Added to wishlist!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-primary transition-colors">All Products</a>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={handleAddToWishlist}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
                  >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    product.availability === 'Available' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {product.availability}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery (Optional) */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <img src={product.image} alt={`View ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    {product.brand}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    ₹{getCurrentPrice()}
                  </span>
                  <span className="text-lg text-slate-600">/ {selectedPeriod}</span>
                </div>
                
                {/* Period Selector */}
                <div className="flex flex-wrap gap-2">
                  {['hour', 'day', 'week', 'month'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedPeriod === period
                          ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      Per {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rental Period */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  Rental Period
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  Timezone: UTC +01:00
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-slate-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center py-3 border-x-2 border-slate-300 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <span className="text-sm text-slate-600">
                    {product.stockQuantity} units available
                  </span>
                </div>
              </div>

              {/* Total Price Display */}
              {startDate && endDate && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">Estimated Total:</span>
                    <span className="text-3xl font-bold text-green-600">
                      ₹{calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Add to Cart
                </button>
                <button className="px-6 py-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined">compare_arrows</span>
                </button>
              </div>

              {/* Security Deposit Info */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">info</span>
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">Security Deposit Required</p>
                  <p className="text-xs text-amber-800">A refundable security deposit of ₹5,000 will be collected at pickup.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-slate-200 p-6 lg:p-10">
            <div className="space-y-6">
              {/* Specifications */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                      <span className="text-slate-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  Rental Terms
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">arrow_right</span>
                    <span>Product must be returned in the same condition as received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">arrow_right</span>
                    <span>Late return charges: ₹500 per day after rental period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">arrow_right</span>
                    <span>Damage charges will be deducted from security deposit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">arrow_right</span>
                    <span>Cancellation allowed up to 24 hours before rental starts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variant Selection Modal */}
      {showVariantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Configure Product</h2>
              <button
                onClick={() => setShowVariantModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-600">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {product.variants && product.variants.map((variant) => (
                  <div key={variant.id} className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {variant.attribute}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {variant.options.map((option, index) => (
                        <label
                          key={index}
                          className={`relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedVariants[variant.id] === index
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="radio"
                              name={variant.id}
                              checked={selectedVariants[variant.id] === index}
                              onChange={() => handleVariantChange(variant.id, index)}
                              className="w-5 h-5 text-primary focus:ring-primary focus:ring-2"
                            />
                            <div className="flex-1">
                              <span className="text-sm font-medium text-slate-900 block">
                                {option}
                              </span>
                              {variant.prices[index] > 0 && (
                                <span className="text-xs text-green-600 font-semibold">
                                  +₹{variant.prices[index]}/{selectedPeriod}
                                </span>
                              )}
                            </div>
                          </div>
                          {selectedVariants[variant.id] === index && (
                            <span className="material-symbols-outlined text-primary text-[20px]">
                              check_circle
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              {Object.keys(selectedVariants).length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Base Price:</span>
                    <span className="text-sm font-semibold text-slate-900">
                      ₹{product.dailyRate}/{selectedPeriod}
                    </span>
                  </div>
                  {getVariantPrice() > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Variants:</span>
                      <span className="text-sm font-semibold text-green-600">
                        +₹{getVariantPrice()}/{selectedPeriod}
                      </span>
                    </div>
                  )}
                  <div className="h-px bg-slate-200 my-2"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">Total Price:</span>
                    <span className="text-xl font-bold text-primary">
                      ₹{getCurrentPrice()}/{selectedPeriod}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setShowVariantModal(false)}
                className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addToCartDirectly}
                disabled={product.variants && Object.keys(selectedVariants).length !== product.variants.length}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProductPage
