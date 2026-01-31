import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PRODUCTS_ARRAY } from '../data/products'

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('day')

  // Use products from shared data
  const products = PRODUCTS_ARRAY

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'electronics', name: 'Electronics', count: 2 },
    { id: 'photography', name: 'Photography', count: 1 },
    { id: 'transportation', name: 'Transportation', count: 1 },
    { id: 'tools', name: 'Tools', count: 1 },
    { id: 'audio', name: 'Audio', count: 1 },
    { id: 'outdoor', name: 'Outdoor', count: 1 },
    { id: 'sports', name: 'Sports', count: 1 }
  ]

  const getCurrentPrice = (product) => {
    switch (selectedPeriod) {
      case 'hour':
        return product.hourlyRate
      case 'day':
        return product.dailyRate
      case 'week':
        return product.weeklyRate
      case 'month':
        return product.monthlyRate
      default:
        return product.dailyRate
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const currentPrice = getCurrentPrice(product)
    const matchesPrice = currentPrice >= priceRange[0] && currentPrice <= priceRange[1]
    
    return matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return getCurrentPrice(a) - getCurrentPrice(b)
      case 'price-high':
        return getCurrentPrice(b) - getCurrentPrice(a)
      case 'rating':
        return b.rating - a.rating
      case 'popular':
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 pt-32 pb-16 hero-gradient overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Live Inventory: {products.length}+ Items
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gradient">
            Explore Our<br />Marketplace
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            Browse premium equipment and assets. Find exactly what you need for your next project.
          </p>
          <div className="w-full max-w-3xl mt-6 p-2 bg-white/80 backdrop-blur-xl border border-white/60 rounded-xl shadow-2xl flex items-center gap-2 relative z-20">
            <div className="flex-1 flex items-center px-4 py-3 bg-white/50 rounded-lg hover:bg-white transition-colors group focus-within:bg-white">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary mr-3">search</span>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What to rent?</label>
                <input
                  className="bg-transparent border-none p-0 text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-0 w-full h-6"
                  placeholder="Camera, Laptop, Drone..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Rental Period Filter */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Rental Period</h3>
                <div className="space-y-2">
                  {['hour', 'day', 'week', 'month'].map((period) => (
                    <label key={period} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="period" 
                        checked={selectedPeriod === period}
                        onChange={() => setSelectedPeriod(period)}
                        className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" 
                      />
                      <span className="text-sm text-slate-600 group-hover:text-primary transition-colors flex-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-slate-400">{category.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="h-1 bg-slate-200 rounded-full relative">
                    <div 
                      className="absolute left-0 h-full bg-primary rounded-full transition-all" 
                      style={{width: `${(priceRange[1] / 10000) * 100}%`}}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full shadow top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{left: `calc(${(priceRange[1] / 10000) * 100}% - 8px)`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>₹0</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 10000])
                  setSearchQuery('')
                }}
                className="w-full px-4 py-2.5 text-sm font-semibold text-primary hover:text-white bg-primary/10 hover:bg-primary rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">filter_alt_off</span>
                Reset Filters
              </button>
            </div>

            {/* Right Grid - Products */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6 glass-panel p-4 rounded-xl">
                <p className="text-slate-600 text-sm">
                  <span className="font-bold text-slate-900 text-lg">{sortedProducts.length}</span> products found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white cursor-pointer hover:border-primary transition-colors"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {sortedProducts.map(product => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 relative"
                  >
                    {/* Out of stock overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-bold backdrop-blur-md">Out of Stock</span>
                      </div>
                    )}
                    
                    <div className="relative h-56 bg-slate-50 overflow-hidden">
                      <img
                        alt={product.name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!product.inStock ? 'grayscale' : ''}`}
                        src={product.image}
                      />

                      {/* Status Badge */}
                      {product.inStock && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold border shadow-sm flex items-center gap-1 text-emerald-600 border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 
                            Available
                          </span>
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0 ml-2">
                          <span className="material-symbols-outlined text-[14px] filled">star</span> {product.rating}
                        </div>
                      </div>
                      
                      <div className="my-3 h-px w-full bg-slate-100"></div>
                      
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Starting from</p>
                          <p className="text-2xl font-bold text-[#0d131c]">
                            ₹{getCurrentPrice(product).toLocaleString()}
                            <span className="text-sm text-slate-500 font-normal">/{selectedPeriod}</span>
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                          View
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">shield</span>
                          Deposit: ₹{product.deposit.toLocaleString()}
                        </span>
                        <span className="text-emerald-600 font-semibold">{product.reviews} reviews</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-16 glass-panel rounded-xl">
                  <span className="material-symbols-outlined text-slate-300 text-6xl mb-4 block">
                    inventory_2
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                  <p className="text-slate-600 mb-4">Try adjusting your filters or search query</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setPriceRange([0, 10000])
                      setSearchQuery('')
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ProductsPage
