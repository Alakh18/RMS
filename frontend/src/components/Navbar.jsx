import { useState } from 'react'

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to get link path
  const getPath = (item) => {
    if (item === 'Home') return '/';
    return `/${item.split(' ')[0].toLowerCase()}`;
  }

  const navItems = ['Products', 'Terms & Condition', 'About Us', 'Contact Us'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl px-4 sm:px-6 py-3 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300 relative">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0 group cursor-pointer">
            <div className="size-9 sm:size-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/50 group-hover:scale-105 transition-all duration-300">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">hexagon</span>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-[#0d131c] to-primary bg-clip-text text-transparent">RentalEco</span>
          </a>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-1 ml-4 xl:ml-8">
            {navItems.map((item) => (
              <a key={item} href={getPath(item)} className="relative px-4 py-2 mt-1 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group">
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop Search Bar (Hidden on Mobile) */}
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

          {/* Right Icons & Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist (Desktop) */}
            <button className="p-2 sm:p-2.5 text-slate-600 hover:text-red-500 transition-all duration-300 rounded-xl hover:bg-red-50 group relative hidden sm:flex">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">favorite</span>
            </button>

            {/* Cart (Desktop) */}
            <button className="p-2 sm:p-2.5 text-slate-600 hover:text-primary transition-all duration-300 rounded-xl hover:bg-primary/10 relative group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform duration-300">shopping_cart</span>
              <span className="absolute -top-0.5 -right-0.5 size-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300">0</span>
            </button>

            {/* Profile Avatar (Desktop) */}
            <div className="relative ml-1 sm:ml-2 hidden sm:block">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden border-2 border-white shadow-md hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=257bf4&color=fff" alt="Profile" className="w-full h-full object-cover" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 z-50">
                   {/* Profile Dropdown Content */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">Alex Doe</p>
                  </div>
                  <div className="py-1">
                    <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      <span>My Account</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            {/* Mobile Search */}
            <div className="relative group mb-4">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={getPath(item)} 
                  className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-400">
                    {item === 'Products' ? 'inventory_2' : 
                     item === 'Terms & Condition' ? 'description' :
                     item === 'About Us' ? 'info' : 'mail'}
                  </span>
                  {item}
                </a>
              ))}
              
              <div className="border-t border-slate-100 mt-2 pt-2">
                 <a href="/profile" className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-slate-400">person</span>
                  My Profile
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar