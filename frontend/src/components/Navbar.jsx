import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartDrawer from './CartDrawer';

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const dropdownRef = useRef(null);

  // Load user data and cart count when component mounts
  useEffect(() => {
    const updateAuthAndCart = () => {
      // Update User
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Update Cart Count
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
      
      // Update Wishlist Count
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };

    // Run on mount
    updateAuthAndCart();

    // Listen for changes (Login/Logout or Add to Cart/Wishlist)
    window.addEventListener('storage', updateAuthAndCart);
    
    // Cleanup
    return () => window.removeEventListener('storage', updateAuthAndCart);
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 relative">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 shrink-0 group cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="size-9 sm:size-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/50 group-hover:scale-105 transition-all duration-300">
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">hexagon</span>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-[#0d131c] to-primary bg-clip-text text-transparent">RentalEco</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 ml-4 xl:ml-8">
          {['Products', 'Terms', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`} 
              className="relative px-4 py-2 mt-1 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group"
            >
              <span className="relative z-10">{item === 'Terms' ? 'Terms & Conditions' : item === 'About' ? 'About Us' : item === 'Contact' ? 'Contact Us' : item}</span>
              <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md xl:max-w-lg mx-4 xl:mx-8 relative group">
          <input 
            type="text" 
            placeholder="Search for premium gear..." 
            className="w-full bg-slate-50/80 border border-slate-200/50 rounded-xl py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white focus:border-primary/30 transition-all duration-300 placeholder:text-slate-400"
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md flex items-center justify-center text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wishlist Link (Updated) */}
          <Link 
            to="/wishlist" 
            className="p-2 sm:p-2.5 text-slate-600 hover:text-red-500 transition-all duration-300 rounded-xl hover:bg-red-50 group relative block"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="p-2 sm:p-2.5 text-slate-600 hover:text-primary transition-all duration-300 rounded-xl hover:bg-primary/10 relative group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-5 bg-gradient-to-br from-primary to-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown Section */}
          <div className="relative ml-1 sm:ml-2" ref={dropdownRef}>
            <button 
              onClick={handleProfileClick}
              className={`size-9 sm:size-10 rounded-xl overflow-hidden border-2 shadow-md transition-all duration-300 focus:outline-none ${
                isDropdownOpen ? 'border-primary ring-2 ring-primary/30' : 'border-white hover:border-primary hover:shadow-lg hover:scale-105'
              } ${!user ? 'bg-slate-100 flex items-center justify-center' : ''}`}
            >
              {user ? (
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=257bf4&color=fff`}
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="material-symbols-outlined text-slate-400">person</span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && user && (
              <div className="absolute right-0 top-full mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
                
                {/* User Info Header */}
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">person</span>
                    My Profile
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">shopping_bag</span>
                    My Orders
                  </Link>
                  
                  <Link 
                    to="/settings" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">settings</span>
                    Settings
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="p-2 border-t border-slate-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">logout</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </nav>
  );
}

export default Navbar;