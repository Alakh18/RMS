import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/productApi'

function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ---------- STATE ----------
  const [quantity, setQuantity] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('day')
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInWishlist, setIsInWishlist] = useState(false)

  // ---------- PRODUCT MAPPER ----------
  const mapProduct = (p) => {
    const priceNum = parseFloat(p.price) || 0
    const images = Array.isArray(p.images) ? p.images.map(img => img.url || img) : []
    const primaryImage = images[0] || '/placeholder.jpg'

    return {
      id: p.id,
      name: p.name,
      description: p.description || 'No description available.',
      brand: p.brand || 'General',
      category: p.category || 'General',
      image: primaryImage,
      images,
      hourlyRate: +(priceNum / 24).toFixed(2),
      dailyRate: priceNum,
      weeklyRate: +(priceNum * 7).toFixed(2),
      monthlyRate: +(priceNum * 30).toFixed(2),
      securityDeposit: parseFloat(p.securityDeposit) || 0,
      stockQuantity: p.quantity ?? 0,
      availability: p.quantity > 0 ? 'Available' : 'Out of Stock',
      hasVariants: false,
      variants: [],
    }
  }

  // ---------- FETCH PRODUCT ----------
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProducts()
        const raw = res?.data?.find(p => p.id.toString() === id)
        if (!raw) return navigate('/products')

        const mapped = mapProduct(raw)
        setProduct(mapped)

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
        setIsInWishlist(wishlist.some(item => item.id === mapped.id))
      } catch {
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id, navigate])

  // ---------- PRICING ----------
  const getCurrentPrice = () => {
    if (!product) return 0
    switch (selectedPeriod) {
      case 'hour': return product.hourlyRate
      case 'day': return product.dailyRate
      case 'week': return product.weeklyRate
      case 'month': return product.monthlyRate
      default: return product.dailyRate
    }
  }

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.abs(end - start)

    let duration = 1
    if (selectedPeriod === 'hour') duration = Math.ceil(diff / 36e5)
    if (selectedPeriod === 'day') duration = Math.ceil(diff / 864e5)
    if (selectedPeriod === 'week') duration = Math.ceil(diff / (864e5 * 7))
    if (selectedPeriod === 'month') duration = Math.ceil(diff / (864e5 * 30))

    return getCurrentPrice() * duration * quantity
  }

  const addToCartDirectly = () => {
    const orderData = {
      productId: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      brand: product.brand,
      product,
      quantity,
      startDate,
      endDate,
      period: selectedPeriod,
      // Ensure totalPrice is a number
      totalPrice: typeof calculateTotalPrice() === 'number' ? calculateTotalPrice() : 0, 
      selectedVariants: product.hasVariants ? selectedVariants : null
    }
    
    // 1. Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 2. Add new item
    const updatedCart = [...existingCart, orderData];
    
    // 3. Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // 4. Force navbar update
    window.dispatchEvent(new Event('storage'));

    console.log('Added to cart:', orderData);
    // Navigate to cart instead of alert for better UX
    navigate('/cart'); 
  }

  const handleAddToCart = () => {
    if (!startDate || !endDate) {
      alert('Please select rental period')
      return
    }
    addToCartDirectly()
  }

  // ---------- WISHLIST ----------
  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    const exists = wishlist.find(item => item.id === product.id)

    const updated = exists
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product]

    localStorage.setItem('wishlist', JSON.stringify(updated))
    setIsInWishlist(!exists)
  }

  // ---------- RENDER ----------
  if (loading) return <div className="p-20 text-center">Loading...</div>
  if (!product) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow">

          {/* IMAGE */}
          <img src={product.image} alt={product.name} className="rounded-xl" />

          {/* DETAILS */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-slate-600">{product.description}</p>

            <div className="text-2xl font-semibold">
              ₹{getCurrentPrice()} / {selectedPeriod}
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
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-6 border border-primary/20 dark:border-primary/30">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    ₹{getCurrentPrice()}
                  </span>
                  <span className="text-lg text-slate-600 dark:text-slate-400">/ {selectedPeriod}</span>
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
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
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
                      max={endDate || undefined}
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
                      min={startDate || undefined}
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
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Estimated Total:</span>
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ₹{calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-4 py-2 rounded ${
                    selectedPeriod === p ? 'bg-blue-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-2 gap-4">
              <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>

            {/* QUANTITY */}
            <input
              type="number"
              min="1"
              max={product.stockQuantity}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />

            {/* TOTAL */}
            {startDate && endDate && (
              <div className="text-xl font-bold text-green-600">
                Total: ₹{calculateTotalPrice()}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 bg-blue-600 text-white py-3 rounded">
                Add to Cart
              </button>
              <button onClick={handleToggleWishlist} className="px-4 bg-gray-200 rounded">
                {isInWishlist ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductPage
