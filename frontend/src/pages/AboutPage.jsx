// src/pages/AboutPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: '👩‍💼',
      bio: 'Former Product Lead at Tech Giants. Passionate about circular economy.',
    },
    {
      name: 'Rajesh Kumar',
      role: 'CTO',
      image: '👨‍💻',
      bio: 'Full-stack architect with 15+ years building scalable platforms.',
    },
    {
      name: 'Anita Desai',
      role: 'Head of Operations',
      image: '👩‍🔧',
      bio: 'Logistics expert ensuring seamless rentals across India.',
    },
    {
      name: 'Vikram Singh',
      role: 'Head of Vendor Relations',
      image: '👨‍💼',
      bio: 'Building trusted partnerships with vendors nationwide.',
    },
  ];

  const milestones = [
    { year: '2024', event: 'RentalEco Founded', desc: 'Started with a vision to revolutionize rentals' },
    { year: '2025', event: 'Reached 5,000 Users', desc: 'Expanded to 5 major cities across India' },
    { year: '2025', event: 'Vendor Network Grows', desc: '500+ verified vendors joined the platform' },
    { year: '2026', event: 'Sustainability Award', desc: 'Recognized for reducing electronic waste' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 text-[#0d131c] dark:text-slate-100 font-display antialiased">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 hero-gradient flex flex-col items-center text-center overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-5xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 shadow-lg mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              Est. 2024 • Trusted by 10,000+ Users
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-8 animate-fade-in-up">
            We Are <span className="text-gradient bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">RentalEco.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-200">
            Building a sustainable, shared economy where <span className="font-bold text-slate-900 dark:text-slate-100">access beats ownership</span>. 
            We empower creators and businesses with the tools they need, when they need them.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link to="/products" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white dark:text-white font-bold rounded-xl shadow-lg hover:shadow-primary/40 transition-all transform hover:scale-105 flex items-center gap-2">
              Explore Products
              <span className="text-xl">→</span>
            </Link>
            <Link to="/vendor-signup" className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all transform hover:scale-105">
              List Your Products
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                📖 Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                From Idea to <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Impact</span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  RentalEco was born in <strong className="text-slate-900 dark:text-slate-100">2024</strong> when our founder, Priya Sharma, 
                  struggled to find affordable camera equipment for a short film project. She realized that thousands 
                  of people faced the same problem—<strong className="text-slate-900 dark:text-slate-100">needing expensive equipment for short periods</strong>.
                </p>
                <p>
                  What started as a simple idea quickly evolved into a mission: <strong className="text-slate-900 dark:text-slate-100">make premium 
                  tools and technology accessible to everyone</strong> without the burden of ownership. We wanted to create 
                  a trusted marketplace where people could rent what they need, when they need it.
                </p>
                <p>
                  Today, we're proud to serve over <strong className="text-primary">10,000 users</strong> and partner with 
                  <strong className="text-primary"> 500+ verified vendors</strong> across India. But we're just getting started.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-primary">2+</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Years Active</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-primary">5</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Cities Covered</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-primary">15k+</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Rentals Completed</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-panel dark:bg-slate-700/50 p-8 rounded-3xl border border-white/50 dark:border-slate-600 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-purple-500/20 to-accent/20 rounded-2xl flex items-center justify-center text-8xl">
                  🚀
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 glass-panel dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-600 animate-float">
                <p className="text-2xl font-black text-primary">10k+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Happy Users</p>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-600 animate-float delay-500">
                <p className="text-2xl font-black text-accent">99%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-20 px-6 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">Mission & Vision</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Guided by purpose, driven by innovation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="glass-panel dark:bg-slate-800 p-10 md:p-12 rounded-3xl border border-white/50 dark:border-slate-600 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-3xl transform group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                To <strong className="text-slate-900 dark:text-slate-100">democratize access to premium assets</strong>. We believe that everyone 
                should have the opportunity to use high-end equipment without the heavy burden of ownership costs. 
                By creating a trusted marketplace, we make professional tools accessible to students, freelancers, 
                startups, and established businesses alike.
              </p>
            </div>

            {/* Vision Card */}
            <div className="glass-panel dark:bg-slate-800 p-10 md:p-12 rounded-3xl border border-white/50 dark:border-slate-600 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-3xl transform group-hover:scale-110 transition-transform">
                👁️
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                To become the <strong className="text-slate-900 dark:text-slate-100">world's most trusted rental ecosystem</strong>, reducing 
                electronic waste and promoting a circular economy through seamless technology. We envision a future where 
                shared access replaces unnecessary ownership, making our planet more sustainable one rental at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">RentalEco by Numbers</h2>
            <p className="text-slate-300">Real impact, real results</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <p className="text-5xl font-black text-primary">10k+</p>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Active Users</p>
              <p className="text-xs text-slate-400">Growing daily</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <p className="text-5xl font-black text-accent">500+</p>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Verified Vendors</p>
              <p className="text-xs text-slate-400">Trusted partners</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <p className="text-5xl font-black text-green-400">15k+</p>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Products Listed</p>
              <p className="text-xs text-slate-400">Always available</p>
            </div>
            <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
              <p className="text-5xl font-black text-yellow-400">99%</p>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Satisfaction</p>
              <p className="text-xs text-slate-400">Customer rated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Milestones */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">Our Journey</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Key milestones that shaped RentalEco</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-accent"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-panel dark:bg-slate-700 p-6 rounded-2xl border border-white/50 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all">
                      <p className="text-3xl font-black text-primary mb-2">{milestone.year}</p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{milestone.event}</h3>
                      <p className="text-slate-600 dark:text-slate-300">{milestone.desc}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg z-10 border-4 border-white dark:border-slate-800">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Passionate individuals working together to transform the rental industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="glass-panel dark:bg-slate-800 p-6 rounded-3xl border border-white/50 dark:border-slate-600 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl transform group-hover:scale-110 transition-transform">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">Why Choose RentalEco?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We aren't just a platform; we are a community dedicated to quality, trust, and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                ♻️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Sustainable Choice</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                By renting instead of buying, you contribute to reducing manufacturing demand and electronic waste. 
                Every rental is a step towards a greener planet.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                ✅
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Verified Trust</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Every vendor is vetted, and every product is inspected. We hold secure deposits to protect both parties, 
                ensuring a safe and reliable rental experience.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Instant Booking</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our real-time inventory system ensures that if you see it, you can rent it. No waiting for approvals—
                book instantly and get your equipment fast.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Cost Effective</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Save up to 80% compared to buying. Get access to premium equipment without the hefty upfront investment, 
                perfect for projects and short-term needs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-50 dark:hover:from-red-900/20 dark:hover:to-rose-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Secure Transactions</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                All payments are processed through secure gateways. Your data is encrypted and protected with 
                industry-standard security measures.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50 dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20 hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 group">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg text-2xl transform group-hover:scale-110 transition-transform">
                📞
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">24/7 Support</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our dedicated support team is available round the clock to assist you with any questions or issues. 
                Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 glass-panel dark:bg-slate-800 rounded-[3rem] p-8 md:p-16 border-2 border-white/50 dark:border-slate-600 shadow-2xl overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-accent/5"></div>
            
            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8 animate-bounce-subtle">
                <span className="text-2xl">🚀</span>
                <span>Start Your Rental Journey</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Ready to Get <span className="text-gradient bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Started?</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join <strong className="text-slate-900 dark:text-slate-100">10,000+ smart renters</strong> who are saving money and helping the planet. 
                Whether you need a camera for a weekend or a laptop for a month, we've got you covered.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12">
                <Link to="/products" className="group px-10 py-5 bg-gradient-to-r from-primary to-primary-dark text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-primary/40 transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3">
                  <span>Browse Products</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
                <Link to="/vendor-signup" className="px-10 py-5 bg-white dark:bg-slate-700 border-3 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-black text-lg rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-primary transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg">
                  Become a Vendor
                </Link>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    ⚡
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Instant Booking</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Book in seconds and get instant confirmation</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    🔒
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Secure Payments</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Bank-grade encryption for all transactions</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                    ✅
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-lg">Verified Products</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Every item inspected and quality guaranteed</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t-2 border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-semibold">4.9/5 Rating</span>
                  </div>
                  <div className="w-px h-6 bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👥</span>
                    <span className="font-semibold">10,000+ Users</span>
                  </div>
                  <div className="w-px h-6 bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <span className="font-semibold">15,000+ Products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
