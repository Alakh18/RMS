import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-20 rounded-t-3xl mx-4 mb-4 overflow-hidden shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-slate-400 text-sm">Get the latest rental deals and exclusive offers delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 min-w-[280px]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Brand Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6 group cursor-pointer">
            <div className="size-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300">
              <span className="material-symbols-outlined text-[24px]">hexagon</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#0d131c] to-primary dark:from-slate-100 dark:to-blue-400 bg-clip-text text-transparent">RentalEco</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-slate-400 max-w-md">
            Empowering businesses and creators with the world&apos;s most flexible and innovative asset rental ecosystem. Join thousands of satisfied customers.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-3 mb-6">
            <a className="w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 text-white shadow-md group" href="#" aria-label="Twitter">
              <span className="text-sm font-bold group-hover:scale-110 transition-transform">𝕏</span>
            </a>
            <a className="w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:scale-110 transition-all duration-300 text-white shadow-md group" href="#" aria-label="LinkedIn">
              <span className="text-sm font-bold group-hover:scale-110 transition-transform">in</span>
            </a>
            <a className="w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:scale-110 transition-all duration-300 text-white shadow-md group" href="#" aria-label="Instagram">
              <span className="text-sm font-bold group-hover:scale-110 transition-transform">Ig</span>
            </a>
            <a className="w-10 h-10 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300 text-white shadow-md group" href="#" aria-label="YouTube">
              <span className="text-sm font-bold group-hover:scale-110 transition-transform">YT</span>
            </a>
          </div>

          {/* App Download */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-xl transition-all duration-300 group">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500">Download on the</p>
                <p className="text-sm font-semibold text-white">App Store</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50 rounded-xl transition-all duration-300 group">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-500">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Platform Section */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></span>
            Platform
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Browse Inventory</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Get a Quote</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Vendor Portal</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Admin Dashboard</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>API Documentation</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></span>
            Company
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Careers</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Press</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Contact</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h4 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></span>
            Legal
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>
              <Link to="/terms" className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Terms of Service</span>
              </Link>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Privacy Policy</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Cookie Policy</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>Disclaimer</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 hover:text-white hover:translate-x-1 transition-all duration-300 group" href="#">
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>GDPR Compliance</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <span>© 2026 RentalEco Inc.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">Status</a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">Support</a>
            <a href="#" className="text-slate-400 hover:text-primary transition-colors">Sitemap</a>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse text-lg">❤️</span>
            <span>for premium rentals</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;