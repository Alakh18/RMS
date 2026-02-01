import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [savedAddress, setSavedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    street: '',
    city: '',
    zip: '',
    country: 'India'
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.address) {
        setSavedAddress(storedUser.address);
        setShowAddressForm(false);
      } else {
        setShowAddressForm(true);
      }
    }
  }, []);

  const handleAddressChange = (e) => {
    setAddressFormData({ ...addressFormData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const newAddress = { ...addressFormData };
    setSavedAddress(newAddress);
    setShowAddressForm(false);

    if (user) {
      const updatedUser = { ...user, address: newAddress };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-900 font-display text-[#0d131c] dark:text-slate-100">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-8 text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-primary font-bold">Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Delivery & Address */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Delivery Method */}
            <div className="glass-panel dark:bg-slate-800 p-6 rounded-3xl border border-white/50 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Delivery Method
              </h2>
              <div className="space-y-4">
                <label 
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'standard' 
                      ? 'bg-slate-900 dark:bg-slate-700 border-slate-900 dark:border-slate-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      deliveryMethod === 'standard' ? 'border-white' : 'border-slate-400'
                    }`}>
                      {deliveryMethod === 'standard' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <div>
                      <span className="font-bold block">Standard Delivery</span>
                      <span className={`text-xs ${deliveryMethod === 'standard' ? 'text-slate-400' : 'text-slate-500'}`}>Delivered to your doorstep</span>
                    </div>
                  </div>
                  <span className={`font-bold ${deliveryMethod === 'standard' ? 'text-white' : 'text-slate-900'}`}>Free</span>
                  <input type="radio" name="delivery" className="hidden" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} />
                </label>

                <label 
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'pickup' 
                      ? 'bg-slate-900 dark:bg-slate-700 border-slate-900 dark:border-slate-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      deliveryMethod === 'pickup' ? 'border-white' : 'border-slate-400'
                    }`}>
                      {deliveryMethod === 'pickup' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <div>
                      <span className="font-bold block">Pick up from Store</span>
                      <span className={`text-xs ${deliveryMethod === 'pickup' ? 'text-slate-400' : 'text-slate-500'}`}>Visit our nearest hub</span>
                    </div>
                  </div>
                  <span className={`font-bold ${deliveryMethod === 'pickup' ? 'text-white' : 'text-slate-900'}`}>Free</span>
                  <input type="radio" name="delivery" className="hidden" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} />
                </label>
              </div>
            </div>

            {/* 2. Delivery Address Logic */}
            <div className="glass-panel dark:bg-slate-800 p-6 rounded-3xl border border-white/50 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Delivery Address
              </h2>

              {/* CASE A: Saved Address Exists -> Show "Use Default" Card */}
              {!showAddressForm && savedAddress && (
                <div className="bg-slate-900 dark:bg-slate-700 text-white p-6 rounded-2xl relative shadow-xl overflow-hidden group animate-in fade-in slide-in-from-bottom-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl -z-0"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</h3>
                      <span className="px-3 py-1 bg-primary/20 dark:bg-primary/30 border border-primary/30 dark:border-primary/50 text-primary dark:text-blue-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                        Default Address
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                      {savedAddress.street}<br />
                      {savedAddress.city} - {savedAddress.zip}<br />
                      {savedAddress.country}
                    </p>
                    
                    <button 
                      onClick={() => setShowAddressForm(true)}
                      className="absolute bottom-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-white text-[18px]">edit</span>
                      <span className="text-xs font-bold">Edit</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CASE B: No Address OR Editing -> Show Form */}
              {showAddressForm && (
                <form onSubmit={handleSaveAddress} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Street Address</label>
                    <input 
                      name="street"
                      required
                      value={addressFormData.street}
                      onChange={handleAddressChange}
                      type="text" 
                      placeholder="123, Tech Park Road..."
                      className="w-full px-5 py-3.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">City</label>
                      <input 
                        name="city"
                        required
                        value={addressFormData.city}
                        onChange={handleAddressChange}
                        type="text" 
                        placeholder="Gurugram"
                        className="w-full px-5 py-3.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Zip Code</label>
                      <input 
                        name="zip"
                        required
                        value={addressFormData.zip}
                        onChange={handleAddressChange}
                        type="text" 
                        placeholder="122003"
                        className="w-full px-5 py-3.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Country</label>
                    <select 
                      name="country"
                      value={addressFormData.country}
                      onChange={handleAddressChange}
                      className="w-full px-5 py-3.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    >
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button 
                      type="submit"
                      className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
                    >
                      Save & Use Address
                    </button>
                    {savedAddress && (
                      <button 
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 font-bold px-6 py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-slate-200 p-8 rounded-3xl sticky top-32 shadow-2xl border border-slate-800">
              
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

              {/* Product List */}
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-800 dark:bg-slate-600 rounded-lg border border-slate-700 dark:border-slate-500 overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{item.product.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                         <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                         <p className="text-xs font-bold text-slate-300">₹{item.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-slate-800 my-6"></div>

              {/* Totals */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Sub Total</span>
                  <span className="text-white font-medium">₹{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Delivery Charges</span>
                  <span className="text-white font-medium">{deliveryMethod === 'standard' ? 'Free' : 'Free'}</span>
                </div>
                <div className="h-px bg-slate-800 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-primary">₹{subTotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                   if (showAddressForm) {
                       alert("Please save your address first.");
                   } else if (savedAddress) {
                       navigate('/payment');
                   } else {
                       setShowAddressForm(true);
                   }
                }}
                disabled={showAddressForm}
                className="w-full py-4 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl transition-all mb-6 flex items-center justify-center gap-2"
              >
                {showAddressForm ? 'Save Address to Continue' : 'Proceed to Payment'}
                {!showAddressForm && <span className="material-symbols-outlined text-[20px]">chevron_right</span>}
              </button>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;