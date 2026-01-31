import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/productApi'

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
  const [isInWishlist, setIsInWishlist] = useState(false)

  const mapProduct = (p) => {
    const priceNum = parseFloat(p.price) || 0
    const images = Array.isArray(p.images) ? p.images.map(img => img.url || img) : []
    const primaryImage = Array.isArray(p.images)
      ? (p.images.find(img => img.isPrimary)?.url || images[0])
      : (images[0] || '/placeholder.jpg')
    const categoryAttr = (p.attributes || []).find(a => a.name && a.name.toLowerCase() === 'category')
    const specs = (p.attributes || []).map(a => {
      if (!a) return null
      if (a.value && a.name) return `${a.name}: ${a.value}`
      return a.value || a.name || null
    }).filter(Boolean)

    return {
      id: p.id,
      name: p.name,
      description: p.description || 'No description available for this product.',
      brand: p.brand || 'General',
      category: categoryAttr?.value || 'General',
      image: primaryImage || '/placeholder.jpg',
      images: images.length ? images : [primaryImage || '/placeholder.jpg'],
      price: p.price,
      hourlyRate: +(priceNum / 24).toFixed(2),
      dailyRate: +priceNum,
      weeklyRate: +(priceNum * 7).toFixed(2),
      monthlyRate: +(priceNum * 30).toFixed(2),
      securityDeposit: parseFloat(p.securityDeposit) || 0,
      stockQuantity: p.quantity ?? 0,
      availability: (p.quantity || 0) > 0 ? 'Available' : 'Out of Stock',
      specifications: specs.length ? specs : ['No specifications provided'],
      hasVariants: false,
      variants: [],
      rating: 4.5,
      reviews: 0,
      raw: p,
    }
  }

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await fetchProducts()
        if (response?.success && Array.isArray(response.data)) {
          const productId = Number(id)
          const raw = response.data.find(p => p.id === productId || p.id?.toString() === id)
          if (raw) {
            const mapped = mapProduct(raw)
            setProduct(mapped)
            // Check if product is already in wishlist
            const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
            const exists = existingWishlist.find(item => item.id === mapped.id)
            setIsInWishlist(!!exists)
          } else {
            navigate('/products')
          }
        } else {
          navigate('/products')
        }
      } catch (error) {
        console.error('Failed to load product details:', error)
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
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

  const addToCartDirectly = () => {
    // Check authentication before allowing cart addition
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to your cart');
      navigate('/login');
      return;
    }

    const orderData = {
      product,
      quantity,
      startDate,
      endDate,
      period: selectedPeriod,
      totalPrice: typeof calculateTotalPrice() === 'number' ? calculateTotalPrice() : 0, 
      selectedVariants: product.hasVariants ? selectedVariants : null
    }
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, orderData];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // 4. Force navbar update
    window.dispatchEvent(new Event('storage'));
    navigate('/cart'); 
  }

  const handleAddToCart = () => {
    // Check authentication immediately when the user clicks "Add to Cart"
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to your cart');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select rental period')
      return
    }
    
    if (product.hasVariants) {
      setShowVariantModal(true)
      return
    }
    
    addToCartDirectly()
  }

  const handleVariantChange = (variantId, optionIndex) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: optionIndex
    }))
  }

  // Toggle wishlist function
  const handleToggleWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    
    // Check if product already exists
    const existsIndex = existingWishlist.findIndex(item => item.id === product.id)
    
    if (existsIndex !== -1) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter(item => item.id !== product.id)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setIsInWishlist(false)
      
      // Show notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-24 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center gap-2'
      notification.innerHTML = '<span class="text-xl">💔</span><span class="font-semibold">Removed from wishlist</span>'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    } else {
      // Add to wishlist
      const updatedWishlist = [...existingWishlist, product]
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setIsInWishlist(true)
      
      // Show notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-24 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center gap-2'
      notification.innerHTML = '<span class="text-xl">❤️</span><span class="font-semibold">Added to wishlist!</span>'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
    
    // Trigger storage event for other tabs/components
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-slate-600">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-primary transition-colors">All Products</a>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 group">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={handleToggleWishlist}
                    className={`p-3 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 group transform hover:scale-110 ${
                      isInWishlist 
                        ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-red-500/50' 
                        : 'bg-white/90 hover:bg-red-50 hover:text-red-500'
                    }`}
                    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <span className={`material-symbols-outlined transition-transform ${
                      isInWishlist ? 'filled-heart' : ''
                    }`}>
                      {isInWishlist ? 'favorite' : 'favorite_border'}
                    </span>
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

              <div className="grid grid-cols-4 gap-3">
                {(product.images && product.images.length ? product.images : [product.image]).slice(0, 4).map((img, i) => (
                  <div key={`${img}-${i}`} className="aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200 cursor-pointer hover:border-primary transition-colors">
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
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

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    ₹{getCurrentPrice()}
                  </span>
                  <span className="text-lg text-slate-600">/ {selectedPeriod}</span>
                </div>
                
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
              </div>

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
                  <p className="text-xs text-amber-800">
                    A refundable security deposit of ₹{(product.securityDeposit || 0).toLocaleString()} will be collected at pickup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-6 lg:p-10">
            <div className="space-y-6">
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVariantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Configure Product</h2>
              <button
                onClick={() => setShowVariantModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-600">close</span>
              </button>
            </div>

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
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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