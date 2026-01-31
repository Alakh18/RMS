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
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Vendor Routes */}
      <Route path="/vendor/*" element={<VendorRoutes />} />
      
      {/* Customer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App