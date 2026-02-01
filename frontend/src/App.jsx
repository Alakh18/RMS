// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import AdminDashboard from './pages/AdminDashboard';
import VendorRoutes from './vendor/VendorRoutes'
import './App.css'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import ProductsPage from './pages/ProductsPage'
import EditProfile from './pages/EditProfile'
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TermsPage from './pages/TermsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WishlistPage from './pages/WishlistPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
    <Routes>
      {/* Vendor Routes */}
      <Route path="/vendor/*" element={<VendorRoutes />} />
      
      {/* Customer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App