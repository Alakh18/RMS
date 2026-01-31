// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import './App.css'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'
import ProductsPage from './pages/ProductsPage'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  )
}

export default App