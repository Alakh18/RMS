// src/pages/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('day');

  // Load wishlist from LocalStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistItems(stored);
    };

    loadWishlist();

    // Listen for changes (in case items are added/removed in other tabs)
    window.addEventListener('storage', loadWishlist);
    return () => window.removeEventListener('storage', loadWishlist);
  }, []);

  const getCurrentPrice = (product) => {
    switch (selectedPeriod) {
      case 'hour':
        return product.hourlyRate;
      case 'day':
        return product.dailyRate;
      case 'week':
        return product.weeklyRate;
      case 'month':
        return product.monthlyRate;
      default:
        return product.dailyRate;
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedList = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
    
    // Dispatch event to update other components
    window.dispatchEvent(new Event('storage'));
    
    // Show notification
    showNotification('💔 Removed from wishlist', 'bg-slate-900');
  };

  const moveToCart = (product) => {
    // Add to cart with default values
    const orderData = {
      product,
      quantity: 1,
      startDate: '',
      endDate: '',
      period: selectedPeriod,
      totalPrice: 0,
      selectedVariants: null
    };
    
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if already in cart
    const existsInCart = existingCart.find(item => item.product.id === product.id);
    if (existsInCart) {
      showNotification('⚠️ Item already in cart', 'bg-amber-500');
      return;
    }
    
    // Add to cart
    const updatedCart = [...existingCart, orderData];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Remove from wishlist
    removeFromWishlist(product.id);
    
    // Show notification
    showNotification('✅ Moved to cart!', 'bg-gradient-to-r from-green-500 to-emerald-600');
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
      localStorage.setItem('wishlist', JSON.stringify([]));
      window.dispatchEvent(new Event('storage'));
      showNotification('🗑️ Wishlist cleared', 'bg-slate-900');
    }
  };

  const showNotification = (message, bgClass) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 ${bgClass} text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in-right flex items-center gap-2`;
    notification.innerHTML = `<span class="font-semibold">${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-6 hero-gradient overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-4">
                <span className="text-red-500 text-xl">❤️</span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Your Favorites
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3">
                My <span className="text-gradient bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Wishlist</span>
              </h1>
              <p className="text-lg text-slate-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            {wishlistItems.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={clearWishlist}
                  className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                  Clear All
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Add More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {wishlistItems.length === 0 ? (
            // Empty State
            <div className="glass-panel p-16 rounded-3xl text-center border border-white/40 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">💔</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Your Wishlist is Empty</h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                Start adding your favorite products to save them for later and never miss out on great deals!
              </p>
              <Link 
                to="/products" 
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all inline-flex items-center gap-3 text-lg transform hover:scale-105"
              >
                <span>Browse Products</span>
                <span className="text-2xl">→</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Period Selector */}
              <div className="mb-8 glass-panel p-6 rounded-2xl border border-white/40 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">View Pricing For</h3>
                    <p className="text-sm text-slate-600">Select your preferred rental period</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['hour', 'day', 'week', 'month'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                          selectedPeriod === period
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-primary'
                        }`}
                      >
                        Per {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="group glass-panel rounded-2xl border border-white/40 overflow-hidden hover:shadow-2xl hover:border-red-300 transition-all duration-300 flex flex-col">
                    
                    {/* Image Area */}
                    <Link to={`/product/${product.id}`} className="relative aspect-[4/3] bg-slate-100 overflow-hidden block">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Remove Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-xl text-red-500 hover:bg-red-50 hover:scale-110 transition-all shadow-lg z-10"
                        title="Remove from Wishlist"
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                      
                      {/* Availability Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-xl shadow-lg ${
                          product.availability === 'Available' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                            : 'bg-slate-500 text-white'
                        }`}>
                          {product.availability}
                        </span>
                      </div>
                    </Link>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">
                            {product.category}
                          </span>
                          {product.rating && (
                            <div className="flex items-center gap-1 text-amber-500">
                              <span className="material-symbols-outlined text-[14px] filled">star</span>
                              <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-lg group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{product.description}</p>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-4 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                        <p className="text-xs text-slate-500 mb-1">Starting from</p>
                        <p className="text-3xl font-black text-slate-900">
                          ₹{getCurrentPrice(product).toLocaleString()}
                          <span className="text-sm text-slate-500 font-normal">/{selectedPeriod}</span>
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => moveToCart(product)}
                          className="px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-1 text-sm transform hover:scale-105"
                        >
                          <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                          Add to Cart
                        </button>
                        <Link 
                          to={`/product/${product.id}`}
                          className="px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-primary transition-all flex items-center justify-center gap-1 text-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Card */}
              <div className="mt-12 glass-panel p-8 rounded-3xl border border-white/40 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Ready to rent?</h3>
                    <p className="text-slate-600">
                      You have <strong className="text-primary">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</strong> in your wishlist
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/cart"
                      className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-black rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                      View Cart
                    </Link>
                    <Link
                      to="/products"
                      className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-primary transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">store</span>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WishlistPage;