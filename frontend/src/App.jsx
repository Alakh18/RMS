import './App.css'

function App() {
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
            <button className="hidden sm:flex text-sm font-medium text-[#0d131c] px-4 py-2 hover:bg-slate-100 rounded-full transition-colors">
              Log In
            </button>
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
            <div className="group p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <h3 className="text-lg font-bold text-[#0d131c] mb-2">1. Browse Inventory</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Explore a curated list of premium assets available near you with real-time availability.
              </p>
            </div>
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

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-[#0d131c]">Featured Premium Gear</h2>
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
              <button className="px-4 py-1.5 rounded-full bg-white shadow-sm text-sm font-bold text-slate-800 transition-all">
                Daily
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800 transition-all">
                Weekly
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:text-slate-800 transition-all">
                Monthly
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 bg-slate-50 overflow-hidden">
                <img
                  alt="Sony Alpha Camera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Sony Mirrorless Camera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAou0OBZmXCww7mTZqJITjTHgAvlNcH1LJH8vL_iHA1vI5HABxEPvLxcK0YnNmGuUq-R3mPh9TLtPh0oiCD0IrrgCBEEbOMktn8fhOBNwtYdeymeH9I9sttUz34wNVDT7CHTwDOYT4uMIKdiWEIl7b1XLZCi83L5MuI7p_AouDLkGUJlHlnmct1bKHmlEKq7ZEBWf25tdxyAYLO7qpy4nPOiWM8tX6OPukQlJ273NFTap0fWtFv2zkKxuEY88rlLfOFJUkvG1DBwner"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-emerald-600 border border-emerald-100 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      Sony FX6 Cinema Line
                    </h3>
                    <p className="text-sm text-slate-500">Professional Full-frame Camera</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <span className="material-symbols-outlined text-[16px] filled">star</span> 4.9
                  </div>
                </div>
                <div className="my-4 h-px w-full bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$145</span>
                    <span className="text-sm text-slate-500">/day</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
            <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 bg-slate-50 overflow-hidden">
                <img
                  alt="Apple MacBook Pro"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="MacBook Pro Laptop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY2k5Dt7nEQe37VI-YKJFBhJIsADaIEUlV8mkbVYeHYPBV0qMZc5LakhrYGfrPb4Q7e0HJ5cHGSzneSDCpuZP0uCiBj1C6qDZrhbW4Z7efubTtINSZH0cGZFDvjzRFTCLmIXiNKTPoPJRxHLvPtrPVX_NoQbuZ4kSLez9shnAJPlX2F5uUZYa66U96jMLzm1Ang6cz5Cf9AUbns1M6XgJWB7aTBHAIU13sDouYSqEYd7sbtM4bgLspEOmIO9JeOUOAyhpLkfXeJgIt"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-emerald-600 border border-emerald-100 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Available
                  </span>
                </div>
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      MacBook Pro 16&quot; M3 Max
                    </h3>
                    <p className="text-sm text-slate-500">128GB RAM, 8TB SSD</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <span className="material-symbols-outlined text-[16px] filled">star</span> 5.0
                  </div>
                </div>
                <div className="my-4 h-px w-full bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$85</span>
                    <span className="text-sm text-slate-500">/day</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
            <div className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 bg-slate-50 overflow-hidden">
                <img
                  alt="Herman Miller Chair"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Ergonomic Office Chair"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFtyLT5AT8oSWbiq3YWRSO4ph3y2khE_5aSLcj7nvHIkqVhorzGY-rRFwrdxrHuZzRhUo1ZaJcEvh3ikk0J74otxl29G4nCkrpuDk9803_kib23yn4IlTM0zt76YrBzXNRqniVIFPA_ZKJjKTmpgb3oULZbmzSTwNkDhsxW4jCITMiBlWGwFWhjTFz485j6V66xU0-En7OeQRnNeoBrahXyS40kPbHaYs4nXn4HWgnd6q-92mfj8Z5pHZaA7sED0E_3C0tJRWdvcNB"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-800/90 backdrop-blur text-xs font-bold text-white border border-slate-700 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Low Stock
                  </span>
                </div>
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-400 hover:text-red-500 flex items-center justify-center shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      Herman Miller Aeron
                    </h3>
                    <p className="text-sm text-slate-500">Remastered, Size B, Graphite</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                    <span className="material-symbols-outlined text-[16px] filled">star</span> 4.8
                  </div>
                </div>
                <div className="my-4 h-px w-full bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$25</span>
                    <span className="text-sm text-slate-500">/day</span>
                  </div>
                  <button className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 rounded-t-2xl mx-4 mb-4">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">hexagon</span>
              </div>
              <span className="text-xl font-bold text-white">RentalEco</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering businesses and creators with the world&apos;s most flexible asset rental ecosystem.
            </p>
            <div className="flex gap-4">
              <a className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <span className="text-xs font-bold">X</span>
              </a>
              <a className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <span className="text-xs font-bold">in</span>
              </a>
              <a className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
                <span className="text-xs font-bold">Ig</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Browse Inventory
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Enterprise
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Partners
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Press
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© 2024 RentalEco Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for premium rentals.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
