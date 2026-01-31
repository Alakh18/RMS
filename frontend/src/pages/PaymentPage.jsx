import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load Script for Razorpay
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

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

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );
  const total = subTotal;

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      // 1. INITIATE PAYMENT (Backend checks stock & creates Order)
      // Note: Ensure your backend URL is correct (e.g., /api/orders/initiate)
      const response = await fetch('http://localhost:5000/api/orders/initiate', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use JWT
        }, 
        // We don't need to send body if backend finds DRAFT by userId, 
        // but sending empty object is safe.
        body: JSON.stringify({}) 
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to initiate payment. Item might be out of stock.");
        setIsProcessing(false);
        return;
      }

      // 2. OPEN RAZORPAY MODAL
      const options = {
        key: "YOUR_TEST_KEY_ID", // Replace with your Public Test Key ID
        amount: data.amount,
        currency: data.currency,
        name: "RentalEco",
        description: "Equipment Rental Payment",
        order_id: data.rzpOrderId,
        handler: async function (response) {
          
          // 3. VERIFY PAYMENT
          try {
            const verifyRes = await fetch('http://localhost:5000/api/orders/verify', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                dbOrderId: data.dbOrderId // Passed from Step 1
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Success! Clear cart and redirect
              localStorage.removeItem('cart');
              window.dispatchEvent(new Event('storage')); // Update cart counts elsewhere

              // Pass data for the Receipt Page
              const orderData = {
                orderItems: cartItems,
                subTotal,
                address,
                orderId: verifyData.orderId // The new 'ORD-...' ID
              };
              
              navigate('/order-confirmation', { state: orderData });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error(error);
            alert("Server error verifying payment.");
          }
        },
        prefill: {
          name: data.customer.name,
          email: data.customer.email,
          contact: data.customer.contact
        },
        theme: { color: "#0d131c" }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert("Payment Failed: " + response.error.description);
      });
      rzp1.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
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

            {/* Delivery & Billing Summary */}
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

            {/* Note about Razorpay */}
            <div className="glass-panel p-6 rounded-2xl border border-blue-200 bg-blue-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Secure Payment via Razorpay</h4>
                  <p className="text-xs text-slate-500">You will be redirected to a secure popup to complete your payment.</p>
                </div>
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