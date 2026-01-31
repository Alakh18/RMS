// src/pages/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-background-light text-[#0d131c] font-display antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Sticky Glass Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-glass">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-glow">
              <span className="material-symbols-outlined text-[20px]">hexagon</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0d131c]">RentalEco</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">
              Marketplace
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">
              How it Works
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">
              Pricing
            </a>
            <a className="text-sm font-medium text-slate-600 hover:text-primary transition-colors" href="#">
              Enterprise
            </a>
          </div>
          <div className="flex items-center gap-3">
            {/* UPDATED: Uses Link to navigate to Login page */}
            <Link 
              to="/login"
              className="hidden sm:flex text-sm font-medium text-[#0d131c] px-4 py-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              Log In
            </Link>
            <button className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2">
              Start Renting
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-1/3 left-[15%] hidden lg:block opacity-80 animate-[bounce_3s_infinite]">
          <img
            alt="3D abstract geometric shape floating"
            className="w-20 h-20 rounded-2xl object-cover shadow-2xl rotate-12"
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          />
        </div>
        <div className="absolute bottom-1/3 right-[15%] hidden lg:block opacity-80 animate-[bounce_4s_infinite]">
          <img
            alt="3D abstract sphere floating"
            className="w-16 h-16 rounded-full object-cover shadow-2xl -rotate-12"
            src="https://images.unsplash.com/photo-1614730341194-75c607ae82db?q=80&w=2574&auto=format&fit=crop"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Live Inventory: 10,000+ Items
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gradient">
            Rent Anything,<br />Manage Everything.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            The all-in-one ecosystem for premium equipment and asset rentals. Experience the future of asset
            management today.
          </p>
          <div className="w-full max-w-3xl mt-6 p-2 bg-white/80 backdrop-blur-xl border border-white/60 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 relative z-20">
            <div className="flex-1 flex items-center px-4 py-3 bg-white/50 rounded-lg hover:bg-white transition-colors group focus-within:bg-white">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary mr-3">search</span>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">What to rent?</label>
                <input
                  className="bg-transparent border-none p-0 text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-0 w-full h-6"
                  placeholder="Camera, Laptop, Drone..."
                  type="text"
                />
              </div>
            </div>
            <div className="w-px bg-slate-200 my-2 hidden md:block"></div>
            <div className="flex-1 flex items-center px-4 py-3 bg-white/50 rounded-lg hover:bg-white transition-colors group focus-within:bg-white">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary mr-3">calendar_month</span>
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dates</label>
                <input
                  className="bg-transparent border-none p-0 text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-0 w-full h-6"
                  placeholder="Add dates"
                  type="text"
                />
              </div>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white rounded-lg px-8 py-3 font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 md:w-auto w-full">
              <span className="material-symbols-outlined">search</span>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-slate-100 bg-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-green-500 filled">verified_user</span>
            <span className="text-sm font-bold text-slate-900">GST Verified Partners</span>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
          <div className="flex flex-1 overflow-hidden relative mask-image-gradient">
            <div className="flex gap-12 items-center animate-scroll whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold font-sans">NETFLIX</span>
              <span className="text-xl font-bold font-serif italic">Spotify</span>
              <span className="text-xl font-bold font-mono">WeWork</span>
              <span className="text-xl font-bold tracking-widest">SONY</span>
              <span className="text-xl font-bold font-sans">airbnb</span>
              <span className="text-xl font-bold font-serif">uber</span>
              <span className="text-xl font-bold font-sans">NETFLIX</span>
              <span className="text-xl font-bold font-serif italic">Spotify</span>
              <span className="text-xl font-bold font-mono">WeWork</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d131c] mb-4">Seamless Rental Experience</h2>
              <p className="text-slate-500 text-lg">
                From discovery to return, our platform handles every step of the rental lifecycle with automated
                precision.
              </p>
            </div>
            <a className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              See full process <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Steps... Keeping it brief for readability, but paste your full content here */}
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">1. Browse Inventory</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Explore a curated list of premium assets available near you with real-time availability.
              </p>
            </div>
            {/* Add other 3 steps here from your original App.jsx */}
             <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">bolt</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">2. Instant Quote</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Get AI-generated pricing based on duration, demand, and dynamic insurance costs.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">3. Secure Rental</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Book instantly with verified ID, secure payments, and smart contract escrow.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">assignment_return</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">4. Easy Return</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Schedule a pickup or drop off at verified smart-locker locations near you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Categories */}
      <section className="py-12 bg-background-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0d131c] mb-8">Smart Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
            {/* Category Items */}
            <div className="lg:col-span-2 group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Camera equipment on a table"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">Photography & Video</h3>
                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Cameras, Lenses, Lighting & Drones
                </p>
              </div>
            </div>
            {/* ... other categories ... */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Modern laptop on a desk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2532&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-xl font-bold">Computing</h3>
              </div>
            </div>
             <div className="group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Modern office chair"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2600&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-xl font-bold">Furniture</h3>
              </div>
            </div>
             <div className="lg:col-span-2 group relative overflow-hidden rounded-xl cursor-pointer">
              <img
                alt="Audio mixing console"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl font-bold">Audio & Sound</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Abbreviated for brevity (copy full section from previous App.jsx if needed) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0d131c] mb-12">Featured Premium Gear</h2>
            {/* ... Product Cards ... */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 bg-slate-50 overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop" alt="Camera"/>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900">Sony FX6 Cinema Line</h3>
                        <div className="flex items-center justify-between mt-4">
                             <span className="text-2xl font-bold text-slate-900">$145<span className="text-sm text-slate-500 font-normal">/day</span></span>
                             <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">Rent</button>
                        </div>
                    </div>
                </div>
                 {/* Card 2 */}
                <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 bg-slate-50 overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=2526&auto=format&fit=crop" alt="Macbook"/>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900">MacBook Pro M3</h3>
                        <div className="flex items-center justify-between mt-4">
                             <span className="text-2xl font-bold text-slate-900">$85<span className="text-sm text-slate-500 font-normal">/day</span></span>
                             <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">Rent</button>
                        </div>
                    </div>
                </div>
                 {/* Card 3 */}
                <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 bg-slate-50 overflow-hidden">
                         <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2600&auto=format&fit=crop" alt="Chair"/>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900">Herman Miller Aeron</h3>
                        <div className="flex items-center justify-between mt-4">
                             <span className="text-2xl font-bold text-slate-900">$25<span className="text-sm text-slate-500 font-normal">/day</span></span>
                             <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold">Rent</button>
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 rounded-t-2xl mx-4 mb-4">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
             <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">hexagon</span>
              </div>
              <span className="text-xl font-bold text-white">RentalEco</span>
            </div>
          <p className="text-sm">Empowering businesses and creators with the world's most flexible asset rental ecosystem.</p>
          <div className="mt-8 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 RentalEco Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home