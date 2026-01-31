import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- CHECKOUT MODAL COMPONENT ---
const CheckoutModal = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-white/20">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Express Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          
          {/* Card Details */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Card Details</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-300"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
            </div>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Name on Card</label>
              <input type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
              <input type="email" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Billing Address</label>
            <input type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>

          {/* Zip, City, Country */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Zip Code</label>
              <input type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
              <input type="text" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
              <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-semibold uppercase">Total to pay</span>
            <span className="text-2xl font-black text-slate-900">₹{total.toLocaleString()}</span>
          </div>
          <button 
            onClick={() => alert('Payment Processing...')}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 text-white font-bold rounded-xl transition-all transform active:scale-95 flex items-center gap-2"
          >
            Pay Now
            <span className="material-symbols-outlined">lock</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// --- MAIN CART PAGE ---
const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // State for modal

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (index, change) => {
    const newCart = [...cartItems];
    const item = newCart[index];
    const newQuantity = item.quantity + change;

    if (newQuantity > 0) {
      item.quantity = newQuantity;
      updateCart(newCart);
    }
  };

  const handleRemoveItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  };

  const deliveryCharge = cartItems.length > 0 ? 500 : 0;
  const subTotal = calculateSubtotal();
  const total = subTotal + deliveryCharge;

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background-light font-display text-[#0d131c]">
      <Navbar />
      
      {/* Checkout Modal Overlay */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={total}
      />

      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">
          Shopping Cart
          <span className="ml-4 text-lg font-medium text-slate-500">
            ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl text-slate-400">shopping_cart_off</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added any rental gear yet.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
            >
              Start Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-6 relative group border border-white/50">
                  <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.product.name}</h3>
                        <p className="text-lg font-bold text-primary">₹{item.totalPrice.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{item.product.brand} • {item.product.category}</p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 mb-4">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>
                          {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                        </span>
                        <span className="text-slate-400 pl-1 border-l border-slate-300">
                           {item.period}s
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleRemoveItem(index)}
                          className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          Remove
                        </button>
                        <button className="text-xs font-bold text-slate-500 hover:text-primary hover:underline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">bookmark</span>
                          Save for Later
                        </button>
                      </div>

                      <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                        <button 
                          onClick={() => handleQuantityChange(index, -1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(index, 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-2xl sticky top-32 border border-white/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                <div className="mb-6 space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rental Period</label>
                  <div className="grid grid-cols-1 gap-2">
                     <div className="relative">
                        <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" disabled value={cartItems[0]?.startDate ? new Date(cartItems[0].startDate).toISOString().split('T')[0] : ''} />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">calendar_month</span>
                     </div>
                     <div className="relative">
                        <input type="date" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" disabled value={cartItems[0]?.endDate ? new Date(cartItems[0].endDate).toISOString().split('T')[0] : ''} />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">calendar_month</span>
                     </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">Dates shown for primary item.</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-slate-900">₹{deliveryCharge}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between text-lg font-black text-slate-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                   <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                   />
                   <button className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors">
                     Apply
                   </button>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => setIsCheckoutOpen(true)} // Open Modal
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    Checkout
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                  <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-colors">
                    Pay with Saved Card
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;