// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import AdminDashboard from './pages/AdminDashboard';
import VendorRoutes from './vendor/VendorRoutes'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import ProductsPage from './pages/ProductsPage'

const PRODUCTS = [
  {
    id: 1,
    name: "Sony FX6 Cinema Line",
    description: "Professional Full-frame Camera",
    price: "$145 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAou0OBZmXCww7mTZqJITjTHgAvlNcH1LJH8vL_iHA1vI5HABxEPvLxcK0YnNmGuUq-R3mPh9TLtPh0oiCD0IrrgCBEEbOMktn8fhOBNwtYdeymeH9I9sttUz34wNVDT7CHTwDOYT4uMIKdiWEIl7b1XLZCi83L5MuI7p_AouDLkGUJlHlnmct1bKHmlEKq7ZEBWf25tdxyAYLO7qpy4nPOiWM8tX6OPukQlJ273NFTap0fWtFv2zkKxuEY88rlLfOFJUkvG1DBwner",
    rating: 4.9,
    status: "Available",
    isVideo: false
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M3 Max",
    description: "128GB RAM, 8TB SSD",
    price: "$85 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY2k5Dt7nEQe37VI-YKJFBhJIsADaIEUlV8mkbVYeHYPBV0qMZc5LakhrYGfrPb4Q7e0HJ5cHGSzneSDCpuZP0uCiBj1C6qDZrhbW4Z7efubTtINSZH0cGZFDvjzRFTCLmIXiNKTPoPJRxHLvPtrPVX_NoQbuZ4kSLez9shnAJPlX2F5uUZYa66U96jMLzm1Ang6cz5Cf9AUbns1M6XgJWB7aTBHAIU13sDouYSqEYd7sbtM4bgLspEOmIO9JeOUOAyhpLkfXeJgIt",
    rating: 5.0,
    status: "Available",
    isVideo: false
  },
  {
    id: 3,
    name: "Herman Miller Aeron",
    description: "Remastered, Size B, Graphite",
    price: "$25 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFtyLT5AT8oSWbiq3YWRSO4ph3y2khE_5aSLcj7nvHIkqVhorzGY-rRFwrdxrHuZzRhUo1ZaJcEvh3ikk0J74otxl29G4nCkrpuDk9803_kib23yn4IlTM0zt76YrBzXNRqniVIFPA_ZKJjKTmpgb3oULZbmzSTwNkDhsxW4jCITMiBlWGwFWhjTFz485j6V66xU0-En7OeQRnNeoBrahXyS40kPbHaYs4nXn4HWgnd6q-92mfj8Z5pHZaA7sED0E_3C0tJRWdvcNB",
    rating: 4.8,
    status: "Low Stock",
    isVideo: false
  },
  {
    id: 4,
    name: "RED V-RAPTOR 8K",
    description: "vv + 6K S35",
    price: "$450 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAou0OBZmXCww7mTZqJITjTHgAvlNcH1LJH8vL_iHA1vI5HABxEPvLxcK0YnNmGuUq-R3mPh9TLtPh0oiCD0IrrgCBEEbOMktn8fhOBNwtYdeymeH9I9sttUz34wNVDT7CHTwDOYT4uMIKdiWEIl7b1XLZCi83L5MuI7p_AouDLkGUJlHlnmct1bKHmlEKq7ZEBWf25tdxyAYLO7qpy4nPOiWM8tX6OPukQlJ273NFTap0fWtFv2zkKxuEY88rlLfOFJUkvG1DBwner", 
    rating: 5.0,
    status: "Out of Stock",
    isVideo: true
  },
  {
    id: 5,
    name: "DJI Mavic 3 Pro",
    description: "Triple Lens Flagship Drone",
    price: "$65 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSIub7x4JXVEReUpk0nG93JGvbhJfvD1tVAEZmL4pK8adSGzJ3E8vXAGyClpu0VztGGEpDv8_QB17jcr3iO6lZh8GyP2qecRFShgQkxHS0Bb9s4-p__kcbpPbtYSukWqUW7ZXU4S_v03g-ishBiHUahFE1UjBPK_aN59fcxFSLob1b9oD-HKcazQeAssPfLwpUJLYkJfCkvpD_gFL5kSzlqOvKSnBAX4t_Nk6fx87jXNNal4vmpYjRgG1ThlwRSxrP1I-895QlHZzV",
    rating: 4.7,
    status: "Available",
    isVideo: true
  },
  {
      id: 6,
      name: "Profoto B10X",
      description: "Lights & Modification",
      price: "$40 / hour",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyUev10S7kj_86wDsCCz1L65okouH0_W5ycNwEUZhfnRL7S5xfhBXz77Jm_6s0DlhwNNllAXsylYldDw3vFAJC17Th54Gj0yWs-ne-NpMfdSjxSnG06yRGOVISvX2kO3WP0finoMc-hcG9WRGcldqResmpePpozbKRv4xnzzkpfVIvMpBsfjolOdjJAtdwbyS_b9RSuqv09QKzmV2rmJXhiciLekLsjSlmcyiNYn7qLScDAhWickSpKav9rmkXQx92HkGI5Y0bxt30",
      rating: 4.9,
      status: "Available",
      isVideo: false
  }
];

function App() {
  return (
    <Routes>
      {/* Vendor Routes */}
      <Route path="/vendor/*" element={<VendorRoutes />} />
      
      {/* Customer Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <div className="bg-background-light text-[#0d131c] font-display antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-32 pb-20 hero-gradient overflow-hidden">
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
          <div className="flex items-center gap-4 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500 filled">verified_user</span>
              <span className="text-sm font-bold text-slate-900">GST Invoice Available</span>
            </div>
            <div className="h-4 w-px bg-slate-300"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 filled">security</span>
              <span className="text-sm font-bold text-slate-900">Secure Deposits</span>
            </div>
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
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">1. Browse & Quote</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Add products to your cart and generate an instant rental quotation with flexible terms.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">receipt_long</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">2. Verify & Order</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Confirm your quotation, complete ID verification, and secure your booking with a deposit.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">package_2</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">3. Pickup & Use</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Receive pickup instructions or schedule delivery. Your rental period starts upon handover.
              </p>
            </div>
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">assignment_returned</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">4. Return & Invoice</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Return items to generate final invoice. Security deposits are refunded after inspection.
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
      <section className="py-24 bg-white" id="marketplace">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#0d131c]">Marketplace</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-8">
              {/* Brand Filter */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Sony</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Canon</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Apple</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">DJI</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">Blackmagic</span>
                  </label>
                </div>
              </div>

              {/* Color Filter */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Color</h3>
                <div className="flex gap-3">
                  <button className="w-8 h-8 rounded-full bg-teal-500 hover:ring-2 hover:ring-offset-2 hover:ring-teal-500 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-purple-600 hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-amber-700 hover:ring-2 hover:ring-offset-2 hover:ring-amber-700 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-orange-500 hover:ring-2 hover:ring-offset-2 hover:ring-orange-500 transition-all"></button>
                </div>
              </div>

              {/* Price Range */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="h-1 bg-slate-200 rounded-full relative">
                    <div className="absolute left-0 w-1/2 h-full bg-primary rounded-full"></div>
                    <div className="absolute left-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>$10</span>
                    <span>$10,000</span>
                  </div>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-4">Duration</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="duration" className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">1 Month</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="duration" className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" defaultChecked />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">6 Months</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="duration" className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors">1 Year</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Grid - Products */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 relative">
                    {/* Out of stock overlay */}
                    {product.status === 'Out of Stock' && (
                      <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white font-bold backdrop-blur-md">Out of Stock</span>
                      </div>
                    )}
                    
                    <div className="relative h-56 bg-slate-50 overflow-hidden">
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
                      <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold shrink-0">
                          <span className="material-symbols-outlined text-[14px] filled">star</span> {product.rating}
                        </div>
                      </div>
                      
                      <div className="my-3 h-px w-full bg-slate-100"></div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {/* Dynamic Pricing Logic embedded in data string for simplicity */}
                          <span className="text-lg font-bold text-slate-900">{product.price.split(' ')[0]}</span>
                          <span className="text-xs text-slate-500"> {product.price.split(' ').slice(1).join(' ')}</span>
                        </div>
                        <button disabled={product.status === 'Out of Stock'} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary/10 disabled:hover:text-primary">
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
                <button className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">1</button>
                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-primary/50 transition-colors">2</button>
                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:border-primary/50 transition-colors">3</button>
                <span className="text-slate-400">...</span>
                <button className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Call to Action */}
      <section className="bg-slate-900 mx-4 rounded-xl py-12 px-6 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Own Equipment? Start Earning.</h2>
            <p className="text-slate-400 text-lg mb-6">
              Join thousands of vendors monetizing their idle assets. We handle the bookings, payments, and insurance so you can focus on growing your inventory.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Guaranteed Payouts</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Verified Renters</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Advanced Analytics</span>
            </div>
          </div>
          <div className="flex gap-4">
             <button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-3 rounded-full transition-all shadow-lg flex items-center gap-2">
              Become a Vendor
            </button>
             <button className="bg-slate-800 text-white hover:bg-slate-700 font-bold px-8 py-3 rounded-full transition-all border border-slate-700">
              Admin Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}

export default App