import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    };

    loadCart();

    // Listen for cart updates
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;

    if (newQuantity > 0 && newQuantity <= 10) {
      updatedCart[index].quantity = newQuantity;
      // Recalculate total price based on quantity
      const basePrice = updatedCart[index].totalPrice / updatedCart[index].quantity;
      updatedCart[index].totalPrice = basePrice * newQuantity;
      updateCart(updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    updateCart(updatedCart);
    showNotification('Item removed from cart', 'bg-red-500');
  };

  const showNotification = (message, bgClass = 'bg-green-500') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 ${bgClass} text-white px-6 py-3 rounded-xl shadow-lg z-[60] animate-slide-in-right`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const calculateTotals = () => {
    const subTotal = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
    const deliveryCharge = cartItems.length > 0 ? 500 : 0;
    return { subTotal, deliveryCharge, total: subTotal + deliveryCharge };
  };

  const { subTotal, deliveryCharge, total } = calculateTotals();

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[60] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
                Your Cart
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors group"
            >
              <span className="material-symbols-outlined text-slate-600 group-hover:text-slate-900 text-[24px]">
                close
              </span>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-slate-400 text-5xl">shopping_cart</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
              <p className="text-slate-600 mb-6">Add items to get started!</p>
              <button
                onClick={() => {
                  onClose();
                  navigate('/products');
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-primary/30 transition-all group">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link 
                      to={`/product/${item.productId || item.product?.id}`}
                      onClick={onClose}
                      className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0"
                    >
                      <img 
                        src={item.image || item.product?.image || 'https://via.placeholder.com/150?text=Product'} 
                        alt={item.name || item.product?.name || 'Product'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${item.productId || item.product?.id}`}
                        onClick={onClose}
                        className="block"
                      >
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.name || item.product?.name || 'Product'}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200 dark:border-slate-600">
                          {item.period}
                        </span>
                        {(item.category || item.product?.category) && (
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.category || item.product?.category}
                          </span>
                        )}
                      </div>
                      
                      {/* Price */}
                      <p className="text-lg font-black text-primary mb-3">
                        ₹{item.totalPrice?.toLocaleString() || 0}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 rounded-lg bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="w-10 text-center font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            disabled={item.quantity >= 10}
                            className="w-7 h-7 rounded-lg bg-white border-2 border-slate-200 text-slate-700 font-bold hover:border-primary hover:bg-primary hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors group/delete"
                        >
                          <span className="material-symbols-outlined text-[18px] group-hover/delete:scale-110 transition-transform">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-bold text-slate-900">₹{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Delivery Charge</span>
                <span className="font-bold text-slate-900">₹{deliveryCharge.toLocaleString()}</span>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="w-full px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-primary hover:bg-slate-50 transition-all"
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
