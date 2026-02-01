// src/pages/Home.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { fetchProducts } from '../services/productApi'

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlistIds, setWishlistIds] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState('day')

  // Load wishlist
  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setWishlistIds(existingWishlist.map(item => item.id))
  }, [])

  // Show Notification Helper
  const showNotification = (message, bgClass) => {
    const notification = document.createElement('div')
    notification.className = `fixed top-24 right-6 ${bgClass} text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center gap-2`
    notification.innerHTML = `<span class="font-semibold">${message}</span>`
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  // Toggle Wishlist
  const handleToggleWishlist = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    const existsIndex = existingWishlist.findIndex(item => item.id === product.id)
    
    if (existsIndex !== -1) {
      const updatedWishlist = existingWishlist.filter(item => item.id !== product.id)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setWishlistIds(updatedWishlist.map(item => item.id))
      showNotification('💔 Removed from wishlist', 'bg-slate-900')
    } else {
      const updatedWishlist = [...existingWishlist, product]
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setWishlistIds(updatedWishlist.map(item => item.id))
      showNotification('❤️ Added to wishlist!', 'bg-gradient-to-r from-red-500 to-pink-500')
    }
    window.dispatchEvent(new Event('storage'))
  }

  // Handle Rent Now
  const handleRentNow = (e, product) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    const cartItem = {
      ...product,
      quantity: 1,
      selectedPeriod: 'day', // Default
      totalPrice: product.dailyRate,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1))
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || []
    // Check if product already exists in cart need a unique way to identify? currently just ID
    // ideally check dates overlap too, but for MVP just ID check or pushing distinct item
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    showNotification('🛍️ Added to cart!', 'bg-green-600')
    window.dispatchEvent(new Event('storage'))
  }

  // Fetch Products
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const response = await fetchProducts()
        if (response && response.success && mounted) {
          const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          const mapped = sorted.map(p => {
            const priceNum = parseFloat(p.price) || 0
            const firstImage = (p.images && p.images.length > 0) ? p.images[0].url : '/placeholder.jpg'
            const tags = (p.attributes || []).slice(0, 3).map(a => a.value || a.name)
            const categoryAttr = (p.attributes || []).find(a => a.name && a.name.toLowerCase() === 'category')
            return {
               id: p.id,
               name: p.name,
               image: firstImage,
               price: p.price,
               images: p.images || [],
               attributes: p.attributes || [],
               securityDeposit: p.securityDeposit,
               quantity: p.quantity,
               hourlyRate: +(priceNum / 24).toFixed(2),
               dailyRate: +priceNum,
               weeklyRate: +(priceNum * 7).toFixed(2),
               monthlyRate: +(priceNum * 30).toFixed(2),
               category: categoryAttr ? categoryAttr.value : 'all',
               tags: tags.length ? tags : ['General'],
               description: p.description || 'No description available',
               inStock: (p.quantity || 0) > 0,
               rating: 4.5, // Mock
               reviews: 0,
               status: (p.quantity || 0) > 0 ? 'Available' : 'Out of Stock',
               isVideo: false
            }
          })
          // Sort by recently added
          setProducts(mapped.slice(0, 6))
        }
      } catch (err) {
        console.error('Failed to load products', err)
      } finally {
        if(mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])
  
  // Calculate Display Price based on Filter (reusing logic from ProductsPage)
  const getDisplayPrice = (product) => {
     switch(selectedPeriod) {
        case 'hour': return `₹${product.hourlyRate}`
        case 'day': return `₹${product.dailyRate}`
        case 'week': return `₹${product.weeklyRate}`
        case 'month': return `₹${product.monthlyRate}`
        default: return `₹${product.dailyRate}`
     }
  }

  return (
    <div className="bg-background-light dark:bg-slate-900 text-[#0d131c] dark:text-slate-100 font-display antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 hero-gradient overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-[15%] hidden lg:block opacity-80 animate-[bounce_3s_infinite]">
          <img
            alt="3D abstract geometric shape floating"
            className="w-20 h-20 rounded-2xl object-cover shadow-2xl rotate-12"
            data-alt="Floating abstract cube shape"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB20NlM6kYUAwYCk8gQA2RKOVGwKqmgv1wuiualJwrw2dgELZDjXGu8xn7aeFtZMFCNLuEvQWs0qdiIE_U_R_cO1Hklu3jW_dD6shY_XaV8WMZaDFLu5cyceSq2Mm5OdxpZv4CwcNMb51d0w8cHSALSs-vh_vWC-tOzEX_ud0sqYoOOdUJetI_xNi8-D33eyXOr1lheFBloH7K7QmHmNeJwPHUN6x6Jc5A-EUEYWBRI-l0SOXSIitLM0-Jps8Mk91Fnke44AwZWfw-7"
          />
        </div>
        <div className="absolute bottom-1/3 right-[15%] hidden lg:block opacity-80 animate-[bounce_4s_infinite]">
          <img
            alt="3D abstract sphere floating"
            className="w-16 h-16 rounded-full object-cover shadow-2xl -rotate-12"
            data-alt="Floating abstract sphere shape"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMK7o-bUe188RuacID2HICnn49_KYiOEq6FcDj6iEXWg4Vs7MNqZ40h_CGUb9TlnZqlBsB4mRDldTnPTltz6p_UQDw1OfO48lNcRDixAVgvQXqzk7KE9KdKSnQEZqAUHz9PhyJU1gSA70whQ9lOKvUgOo1s9b0mKYk2qLhQR54sv8XRicxY_vZ22WchArbgTea5_pMoeZOY9YodRzQkYnpVOXaSpilCs69NmSWy7gM-HUd_xlBCDen2Fhatdfal7ZPaGgPGBJrvK3z"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-gradient px-4">
            Rent Anything,<br />Manage Everything.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed px-4 mt-6">
            The all-in-one ecosystem for premium equipment and asset rentals. Experience the future of asset
            management today.
          </p>
        </div>
      </section>

      {/* Trust section removed per request */}

      {/* How It Works */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d131c] dark:text-slate-100 mb-4">Seamless Rental Experience</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                From discovery to return, our platform handles every step of the rental lifecycle with automated
                precision.
              </p>
            </div>
            <a className="text-primary dark:text-blue-400 font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              See full process <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] dark:text-slate-100 mb-2">1. Browse & Quote</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Add products to your cart and generate an instant rental quotation with flexible terms.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">receipt_long</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] dark:text-slate-100 mb-2">2. Verify & Order</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Confirm your quotation, complete ID verification, and secure your booking with a deposit.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">package_2</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] dark:text-slate-100 mb-2">3. Pickup & Use</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Receive pickup instructions or schedule delivery. Your rental period starts upon handover.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:border-primary/20 dark:hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">assignment_returned</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] dark:text-slate-100 mb-2">4. Return & Invoice</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                Return items to generate final invoice. Security deposits are refunded after inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Categories */}
      <section className="py-12 bg-background-light dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0d131c] dark:text-slate-100 mb-8">Smart Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
            <div className="lg:col-span-2 group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Camera equipment on a table"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Professional camera gear spread"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSIub7x4JXVEReUpk0nG93JGvbhJfvD1tVAEZmL4pK8adSGzJ3E8vXAGyClpu0VztGGEpDv8_QB17jcr3iO6lZh8GyP2qecRFShgQkxHS0Bb9s4-p__kcbpPbtYSukWqUW7ZXU4S_v03g-ishBiHUahFE1UjBPK_aN59fcxFSLob1b9oD-HKcazQeAssPfLwpUJLYkJfCkvpD_gFL5kSzlqOvKSnBAX4t_Nk6fx87jXNNal4vmpYjRgG1ThlwRSxrP1I-895QlHZzV"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">Photography &amp; Video</h3>
                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Cameras, Lenses, Lighting &amp; Drones
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Modern laptop on a desk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Laptop computer workspace"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqByZr2iGgHuh9kJtR_yswrhelKuA6sYjc2UhFjv39Broyam8U9S38CVGY1f8qxOy6tHInxcyC9Bf1zTN5LjJI6vQrwHHu30VUaYSUeo7abSa1gBRToSyFGe1SFTvr-4h2kzWzP9VYzIwrR7pYDYK0eBpxJIk92Q4g4p1PPWbMigszCIhkeZK2Dh_i8Rg5PjwM816jun2y1QNNf5Ddkte861qWjODwvIScLjSji96vASsuiITKx3Rwbx3EeLSOl3fl3uvl_haXEca8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-xl font-bold">Computing</h3>
                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Laptops, Desktops &amp; Servers
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Modern office chair"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Modern office furniture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1p8hOSYkRv4QnFnrNjnTYb8fE1HYBGAWUeN3V8UtJJFm-MNrBw6SmGNmazI7k-X6uJlvalP17PRdsp7k1JX_gnrTFJgyntHojIc5nM2_0mkCfQAG0UzeFihSCCnfJudR_pu5UBr-mRjwpR84-bK1dYABzMm0wiN-buMTDImxZZkLZoA7kEAlf-Negq28_7-nQXJ4kHwJLfcfvg6d_AVLMqeQS2zEp5BhTNnNYQmDwjKw-uZmnDLnzoSS2hjWg5VmMISfryCsTjs2W"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-xl font-bold">Office Furniture</h3>
                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Chairs, Desks &amp; Pods
                </p>
              </div>
            </div>
            <div className="lg:col-span-2 group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Audio mixing console"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-alt="Professional audio equipment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyUev10S7kj_86wDsCCz1L65okouH0_W5ycNwEUZhfnRL7S5xfhBXz77Jm_6s0DlhwNNllAXsylYldDw3vFAJC17Th54Gj0yWs-ne-NpMfdSjxSnG06yRGOVISvX2kO3WP0finoMc-hcG9WRGcldqResmpePpozbKRv4xnzzkpfVIvMpBsfjolOdjJAtdwbyS_b9RSuqv09QKzmV2rmJXhiciLekLsjSlmcyiNYn7qLScDAhWickSpKav9rmkXQx92HkGI5Y0bxt30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">Audio &amp; Sound</h3>
                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Mixers, Speakers &amp; Microphones
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section - New 2 Column Layout */}
      <section className="py-24 bg-white dark:bg-slate-800" id="marketplace">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#0d131c] dark:text-slate-100">Marketplace</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-8">
              {/* Brand Filter */}
              <div className="glass-panel dark:bg-slate-700 dark:border-slate-600 p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Sony</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Canon</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Apple</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">DJI</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Blackmagic</span>
                  </label>
                </div>
              </div>

              {/* Color Filter */}
              <div className="glass-panel dark:bg-slate-700 dark:border-slate-600 p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Color</h3>
                <div className="flex gap-3">
                  <button className="w-8 h-8 rounded-full bg-teal-500 hover:ring-2 hover:ring-offset-2 hover:ring-teal-500 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-purple-600 hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-amber-700 hover:ring-2 hover:ring-offset-2 hover:ring-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-orange-500 hover:ring-2 hover:ring-offset-2 hover:ring-orange-500 transition-all"></button>
                </div>
              </div>

              {/* Price Range */}
              <div className="glass-panel dark:bg-slate-700 dark:border-slate-600 p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="h-1 bg-slate-200 dark:bg-slate-600 rounded-full relative">
                    <div className="absolute left-0 w-1/2 h-full bg-primary rounded-full"></div>
                    <div className="absolute left-1/2 w-4 h-4 bg-white dark:bg-slate-300 border-2 border-primary rounded-full shadow top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                    <span>$10</span>
                    <span>$10,000</span>
                  </div>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="glass-panel dark:bg-slate-700 dark:border-slate-600 p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Duration</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                       type="radio" 
                       name="duration" 
                       className="w-4 h-4 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" 
                       checked={selectedPeriod === 'hour'}
                       onChange={() => setSelectedPeriod('hour')}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Hourly</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                       type="radio" 
                       name="duration" 
                       className="w-4 h-4 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" 
                       checked={selectedPeriod === 'day'}
                       onChange={() => setSelectedPeriod('day')}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Daily</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="w-4 h-4 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" 
                      checked={selectedPeriod === 'week'}
                       onChange={() => setSelectedPeriod('week')}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Weekly</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="duration" 
                      className="w-4 h-4 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary" 
                      checked={selectedPeriod === 'month'}
                       onChange={() => setSelectedPeriod('month')}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">Monthly</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Grid - Products */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {loading ? (
                  <div className="col-span-full h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : products.map(product => (
                  <Link to={`/products/${product.id}`} key={product.id} className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative block">
                    {/* Out of stock overlay */}
                    {product.status === 'Out of Stock' && (
                      <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-bold backdrop-blur-md">Out of Stock</span>
                      </div>
                    )}
                    
                    <div className="relative h-56 bg-slate-50 dark:bg-slate-600 overflow-hidden">
                      <img
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${product.status === 'Out of Stock' ? 'grayscale' : ''}`}
                        src={product.image}
                      />
                      
                      {/* Video Play Overlay */}
                      {product.isVideo && product.status !== 'Out of Stock' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg text-primary hover:scale-110 transition-transform cursor-pointer">
                            <span className="material-symbols-outlined text-[28px] ml-1">play_arrow</span>
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      {product.status !== 'Out of Stock' && (
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold border shadow-sm flex items-center gap-1 ${
                            product.status === 'Available' ? 'text-emerald-600 border-emerald-100' : 'text-amber-600 border-amber-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              product.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}></span> 
                            {product.status}
                          </span>
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button 
                        onClick={(e) => handleToggleWishlist(e, product)}
                        className={`absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 ${wishlistIds.includes(product.id) ? 'text-red-500 !opacity-100 !translate-y-0' : ''}`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${wishlistIds.includes(product.id) ? 'filled' : ''}`}>favorite</span>
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{product.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
                          <span className="material-symbols-outlined text-[14px] filled">star</span> {product.rating}
                        </div>
                      </div>
                      
                      <div className="my-3 h-px w-full bg-slate-100 dark:bg-slate-600"></div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{getDisplayPrice(product)}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400"> / {selectedPeriod}</span>
                        </div>
                        <button 
                          onClick={(e) => handleRentNow(e, product)}
                          disabled={product.status === 'Out of Stock'} className="px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-xs font-bold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary/10 disabled:hover:text-primary">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">1</button>
                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-primary/50 transition-colors">2</button>
                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-primary/50 transition-colors">3</button>
                <span className="text-slate-400 dark:text-slate-500">...</span>
                <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Component */}
      <Footer />
    </div>
  )
}

export default Home