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

  // ---------- BACKEND ADD TO CART ----------
  const addToCartDirectly = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to continue')
      return navigate('/login')
    }

    if (!startDate || !endDate) {
      alert('Please select rental dates')
      return
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
      const res = await fetch(`${API_BASE}/api/orders/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: Number(id),
          quantity,
          startDate,
          endDate,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      navigate('/cart')
    } catch (err) {
      alert(err.message || 'Failed to add to cart')
    }
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

            {/* PERIOD */}
            <div className="flex gap-2">
              {['hour', 'day', 'week', 'month'].map(p => (
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
