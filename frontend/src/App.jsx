// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VendorSignup from './pages/VendorSignup';
import AdminDashboard from './pages/AdminDashboard';
import VendorRoutes from './vendor/VendorRoutes'; // Ensure this file exports a component with <Routes>
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import ProductsPage from './pages/ProductsPage';
import EditProfile from './pages/EditProfile';
import CartPage from './pages/CartPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Routes>
      {/* --- Main Customer Routes --- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />

      {/* --- Product & Shopping Routes --- */}
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product" element={<ProductPage />} /> {/* Generic product page */}
      <Route path="/product/:id" element={<ProductPage />} /> {/* Specific product details */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      
      {/* --- User Account Routes --- */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={<OrdersPage />} />

      {/* --- Admin & Vendor Routes --- */}
      <Route path="/admin" element={<AdminDashboard />} />
      
      {/* IMPORTANT: Since we use '/*', VendorRoutes.jsx MUST contain 
         its own <Routes>...</Routes> block to handle sub-paths.
      */}
      <Route path="/vendor/*" element={<VendorRoutes />} />

      {/* --- Static Pages --- */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;