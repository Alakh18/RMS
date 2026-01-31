import { useState } from 'react'

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0 group cursor-pointer">
          <div className="size-9 sm:size-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/50 group-hover:scale-105 transition-all duration-300">
            <span className="material-symbols-outlined text-[22px] sm:text-[24px]">hexagon</span>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-[#0d131c] to-primary bg-clip-text text-transparent">RentalEco</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 ml-4 xl:ml-8">
          <a href="/products" className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group">
            <span className="relative z-10">Products</span>
            <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </a>
          <a href="/terms" className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group">
            <span className="relative z-10">Terms & Conditions</span>
            <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </a>
          <a href="/about" className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group">
            <span className="relative z-10">About Us</span>
            <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </a>
          <a href="/contact" className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group">
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </a>
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
          {/* Wishlist */}
          <button className="p-2 sm:p-2.5 text-slate-600 hover:text-red-500 transition-all duration-300 rounded-xl hover:bg-red-50 group relative">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">favorite</span>
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          {/* Cart with Badge */}
          <button className="p-2 sm:p-2.5 text-slate-600 hover:text-primary transition-all duration-300 rounded-xl hover:bg-primary/10 relative group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">shopping_cart</span>
            <span className="absolute -top-0.5 -right-0.5 size-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300">0</span>
          </button>

          {/* Profile Avatar */}
          <div className="relative ml-1 sm:ml-2">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden border-2 border-white shadow-md hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=257bf4&color=fff" alt="Profile" className="w-full h-full object-cover" />
            </button>
            
            {/* Enhanced Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">Alex Doe</p>
                  <p className="text-xs text-slate-500 mt-0.5">alex.doe@email.com</p>
                </div>
                <div className="py-1">
                  <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group">
                    <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">person</span>
                    <span>My Account</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group">
                    <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">shopping_bag</span>
                    <span>My Orders</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group">
                    <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">settings</span>
                    <span>Settings</span>
                  </a>
                </div>
                <div className="h-px bg-slate-100 my-1"></div>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group">
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">logout</span>
                  <span className="font-medium">Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
