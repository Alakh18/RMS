import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addItemToCart, confirmOrder } from '../services/orderApi';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.length === 0) {
      navigate('/cart');
      return;
    }
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.address) {
        setAddress(storedUser.address);
      } else {
        alert("Please provide a delivery address first.");
        navigate('/checkout');
      }
    }
  }, [navigate]);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );
  const total = subTotal;

  const handlePayNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to place an order.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      let orderId = null;

      for (const item of cartItems) {
        const productId = item.product?.id || item.productId;
        if (!productId) continue;

        const response = await addItemToCart({
          productId,
          quantity: item.quantity,
          startDate: item.startDate,
          endDate: item.endDate,
        });

        if (!orderId && response?.orderId) {
          orderId = response.orderId;
        }
      }

      if (!orderId) {
        throw new Error('Unable to create order. Please try again.');
      }

      const confirmRes = await confirmOrder(orderId);
      const orderNumber = confirmRes?.orderNumber || `ORD-${orderId}`;

      const orderData = {
        orderItems: cartItems,
        total,
        subTotal,
        address,
        orderId: orderNumber,
      };

      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('storage'));

      navigate('/order-confirmation', { state: orderData });
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light font-display text-[#0d131c]">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-sm font-medium text-slate-500 flex items-center gap-2">
          <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <span className="text-slate-300">/</span>
          <Link to="/checkout" className="hover:text-primary transition-colors">Address</Link>
          <span className="text-slate-300">/</span>
          <span className="text-primary font-bold">Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Payment Forms */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Payment Method</h2>

            {/* 1. Credit Card Form */}
            <div className="glass-panel p-8 rounded-3xl border border-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">credit_card</span>
                Card Details
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      maxLength="19"
                      className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl font-mono text-lg text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                       <div className="h-5 w-8 bg-slate-100 rounded border border-slate-200"></div>
                       <div className="h-5 w-8 bg-slate-100 rounded border border-slate-200"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">CVC</label>
                      <input 
                        type="password" 
                        placeholder="123" 
                        maxLength="3"
                        className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                      />
                   </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${saveCard ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                    {saveCard && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                  </div>
                  <input type="checkbox" className="hidden" checked={saveCard} onChange={() => setSaveCard(!saveCard)} />
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors">Save my payment details for future purchases</span>
                </label>
              </div>
            </div>

            {/* 2. Delivery & Billing Summary */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl relative shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md border border-white/10">
                     <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                     Delivery & Billing
                   </div>
                   <h3 className="text-xl font-bold mb-1">{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</h3>
                   <p className="text-slate-300 text-sm leading-relaxed max-w-md opacity-80 mt-2">
                     {address ? (
                       <>
                         {address.street}<br/>
                         {address.city} - {address.zip}<br/>
                         {address.country}
                       </>
                     ) : (
                       <span className="text-red-400">No address provided</span>
                     )}
                   </p>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors border border-white/10"
                  title="Edit Address"
                >
                  <span className="material-symbols-outlined text-white text-[20px]">edit</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl sticky top-32 shadow-xl border border-slate-100">
              
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>

              {/* Product Preview (Primary Item) */}
              <div className="mb-6 flex gap-4">
                 <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {cartItems.length > 0 && cartItems[0].product && (
                      <img src={cartItems[0].product.image} alt="Product" className="w-full h-full object-cover" />
                    )}
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-0.5">Primary Item</p>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {cartItems.length > 0 ? cartItems[0].product.name : 'No Items'}
                    </h4>
                    {cartItems.length > 1 && (
                      <p className="text-xs font-bold text-primary mt-1">+{cartItems.length - 1} other items</p>
                    )}
                 </div>
              </div>

              <div className="h-px bg-slate-100 my-6"></div>

              {/* Rental Period */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rental Period</p>
                {cartItems.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-medium text-slate-700 flex flex-col gap-1">
                     <div className="flex justify-between">
                        <span className="text-slate-500">Start:</span>
                        <span>{new Date(cartItems[0].startDate).toLocaleDateString()}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500">End:</span>
                        <span>{new Date(cartItems[0].endDate).toLocaleDateString()}</span>
                     </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Sub Total</span>
                  <span className="text-slate-900 font-medium">₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery Charges</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between text-lg font-black text-slate-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button 
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all mb-6 flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Pay Now
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>

              {/* Back Link */}
              <div className="text-center flex items-center justify-center gap-3">
                <span className="text-slate-300 text-xs uppercase font-bold tracking-wider">OR</span>
                <Link to="/checkout" className="text-slate-500 text-sm font-bold hover:text-slate-900 transition-colors inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Address
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;