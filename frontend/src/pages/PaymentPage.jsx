import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Use your specific Backend URL
const API_BASE_URL = 'http://localhost:3000/api'; 

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // 1. Load Razorpay Script Safely
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setIsRazorpayLoaded(true);
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

  // Calculate Total
  const subTotal = cartItems.reduce((total, item) => {
    // If totalPrice is pre-calculated in localCart (price * days * qty), use it directly.
    // Otherwise, calculate: (price * quantity)
    // We check item.priceAtBooking (DB) or item.product.price (Local)
    const price = Number(item.totalPrice || item.priceAtBooking || item.product?.price || 0);
    const qty = Number(item.quantity || 1);
    
    // If totalPrice exists, return that. Else calculate.
    return total + (item.totalPrice ? Number(item.totalPrice) : (price * qty));
  }, 0);
  
  const total = subTotal;

  // 3. Handle Payment
  const handlePayNow = async (e) => {
    // [CRITICAL] PREVENT PAGE RELOAD
    e.preventDefault(); 
    
    if (!isRazorpayLoaded) {
      alert("Razorpay SDK is loading... please wait.");
      return;
    }

    setIsProcessing(true);
    const token = localStorage.getItem('token');

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
        key: "rzp_test_SAdeEvv7rFnS2e", // <--- REPLACE THIS WITH YOUR KEY
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
                type="button" // <--- CRITICAL: Prevents Form Submission/Reload
                onClick={handlePayNow}
                disabled={isProcessing || !isRazorpayLoaded}
                className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all mb-6 flex items-center justify-center gap-2 shadow-lg hover:shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Pay Now"}
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