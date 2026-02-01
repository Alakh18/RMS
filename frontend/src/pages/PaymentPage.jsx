import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getQuotationStatus, payOrder } from '../services/orderApi';

// Use your specific Backend URL
const API_BASE_URL = 'http://localhost:3000/api'; 

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quotationStatus, setQuotationStatus] = useState(null);
  const [quotationId, setQuotationId] = useState(null);
  const [saveCard, setSaveCard] = useState(false);

  // 1. Load Razorpay Script Safely
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onerror = () => console.error('Razorpay SDK failed to load');
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  // 2. Load Cart & User Data
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Check Auth
    if (!token) {
      alert("Please login to continue.");
      navigate('/login');
      return;
    }

    // A. Load User
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      // Check Address
      if (storedUser.address) {
        setAddress(storedUser.address);
      } else {
        alert("Please provide a delivery address first.");
        navigate('/checkout');
        return;
      }
    }

    // B. Load Cart (Prioritize LocalStorage to prevent redirect issues)
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (localCart.length > 0) {
      setCartItems(localCart);
    } else {
      // If local is empty, try DB (Fallback)
      fetch(`${API_BASE_URL}/orders/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        const dbItems = Array.isArray(data) ? data : (data.items || []);
        if (dbItems.length > 0) {
          setCartItems(dbItems);
        } else {
          // Only redirect if BOTH are empty
          alert("Your cart is empty.");
          navigate('/cart');
        }
      })
      .catch(err => console.error("Cart fetch error:", err));
    }
  }, [navigate]);

  // 3. Load Quotation Status
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await getQuotationStatus();
        if (res?.data) {
          setQuotationStatus(res.data.status);
          setQuotationId(res.data.id);
        } else {
          setQuotationStatus(null);
          setQuotationId(null);
        }
      } catch (err) {
        console.error('Failed to load quotation status:', err);
      }
    };

    loadStatus();
  }, []);

  // Calculate Total
  const subTotal = cartItems.reduce((total, item) => {
    const price = Number(item.totalPrice || item.priceAtBooking || item.product?.price || 0);
    const qty = Number(item.quantity || 1);
    return total + (item.totalPrice ? Number(item.totalPrice) : (price * qty));
  }, 0);
  
  const total = subTotal;

  // Handle Request Quotation
  const handleRequestQuotation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit quotation.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // [CRITICAL] Prepare Items for Backend
      // We send this so Backend can create the Order if it doesn't exist yet
      const itemsPayload = cartItems.map(item => ({
        productId: item.productId || item.product?.id,
        quantity: item.quantity,
        startDate: item.startDate || new Date(),
        endDate: item.endDate || new Date()
      }));

      console.log("Initiating Payment with items:", itemsPayload);

      // STEP 1: Create Order on Backend
      const response = await fetch(`${API_BASE_URL}/orders/initiate`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }, 
        // [CRITICAL] SEND ITEMS IN BODY
        body: JSON.stringify({ items: itemsPayload }) 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      console.log("Order Created:", data);

      // STEP 2: Open Razorpay
      const options = {
        key: "rzp_test_SAdeEvv7rFnS2e",
        amount: data.amount,
        currency: data.currency,
        name: "RentalEco",
        description: "Equipment Rental",
        order_id: data.rzpOrderId,
        handler: async function (response) {
          console.log("Payment Success. Verifying...");
          
          // STEP 3: Verify
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/orders/verify`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: data.dbOrderId
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful!");
              localStorage.removeItem('cart'); 
              window.dispatchEvent(new Event('storage'));
              navigate('/order-confirmation', { state: { orderId: verifyData.orderId } });
            } else {
              alert("Verification Failed: " + verifyData.error);
            }
          } catch (error) {
            console.error(error);
            alert("Verification Error");
          }
        },
        prefill: {
          name: data.customer?.name || "",
          email: data.customer?.email || "",
          contact: ""
        },
        theme: { color: "#0d131c" },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
        setIsProcessing(false);
      });
    rzp1.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert(error.message);
      setIsProcessing(false);
    }
  };

  const handlePayNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to place an order.');
      navigate('/login');
      return;
    }

    if (quotationStatus !== 'CONFIRMED') {
      alert('Quotation not approved yet.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = quotationId;
      if (!orderId) throw new Error('No quotation found for payment');

      const payRes = await payOrder(orderId);
      const orderNumber = payRes?.orderNumber || `ORD-${orderId}`;

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
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm font-medium text-slate-500 flex items-center gap-2">
          <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <span className="text-slate-300">/</span>
          <Link to="/checkout" className="hover:text-primary transition-colors">Address</Link>
          <span className="text-slate-300">/</span>
          <span className="text-primary font-bold">Payment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Payment Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Payment Method</h2>
            
            {/* Address Summary */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl relative shadow-xl overflow-hidden">
               <h3 className="text-xl font-bold mb-1">{user ? `${user.firstName} ${user.lastName}` : 'User'}</h3>
               <p className="text-slate-300 text-sm mt-2">
                 {address ? `${address.street}, ${address.city} - ${address.zip}` : "No Address"}
               </p>
            </div>

            {/* Quotation Status */}
            <div className="glass-panel p-6 rounded-3xl border border-white/50">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">request_quote</span>
                Quotation Status
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                  quotationStatus === 'CONFIRMED'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : quotationStatus === 'SENT'
                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    : quotationStatus === 'CANCELLED'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {quotationStatus === 'CONFIRMED'
                    ? 'APPROVED'
                    : quotationStatus === 'SENT'
                    ? 'PENDING'
                    : quotationStatus === 'CANCELLED'
                    ? 'REJECTED'
                    : 'NOT SUBMITTED'}
                </span>
                {quotationStatus !== 'CONFIRMED' && (
                  <button
                    onClick={handleRequestQuotation}
                    disabled={isProcessing}
                    className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-60"
                  >
                    Request Quotation
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-3">
                You can pay only after the vendor approves your quotation.
              </p>
            </div>

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

            {/* Razorpay Banner */}
            <div className="glass-panel p-6 rounded-2xl border border-blue-200 bg-blue-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">R</div>
                <div>
                  <h4 className="font-bold text-slate-900">Secure Payment via Razorpay</h4>
                  <p className="text-xs text-slate-500">Redirecting to secure payment gateway...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl sticky top-32 shadow-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Items</span>
                  <span className="text-slate-900 font-medium">{cartItems.length}</span>
                </div>
                <div className="h-px bg-slate-100 my-2"></div>
                <div className="flex justify-between text-lg font-black text-slate-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* PAY NOW BUTTON */}
              <button 
                type="button" 
                onClick={handlePayNow}
                disabled={isProcessing || quotationStatus !== 'CONFIRMED'}
                className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all mb-6 flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {quotationStatus === 'CONFIRMED' ? 'Pay Now' : 'Awaiting Approval'}
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <Link to="/checkout" className="text-slate-500 text-sm font-bold hover:text-slate-900 transition-colors">
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