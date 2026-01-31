import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;

    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      updateCart(updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const calculateTotals = () => {
    const subTotal = cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
    const deliveryCharge = cartItems.length > 0 ? 500 : 0;
    return { subTotal, deliveryCharge, total: subTotal + deliveryCharge };
  };

  const { subTotal, deliveryCharge, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-background-light font-display text-[#0d131c]">
      <Navbar />

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
                  
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.product.name}</h3>
                        <p className="text-lg font-bold text-primary">₹{item.totalPrice.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{item.product.brand} • {item.product.category}</p>
                      
                      {/* Rental Dates Badge */}
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

                      {/* Quantity Stepper */}
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

              <Link to="/products" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline mt-4">
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-2xl sticky top-32 border border-white/50">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

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
                    placeholder="Enter coupon code" 
                    className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                   />
                   <button className="px-5 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors">
                     Apply
                   </button>
                </div>

                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

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