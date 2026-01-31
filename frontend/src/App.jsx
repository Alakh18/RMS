// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VendorSignup from './pages/VendorSignup'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import ProductsPage from './pages/ProductsPage'

const PRODUCTS = [
  {
    id: 1,
    name: "Sony FX6 Cinema Line",
    description: "Professional Full-frame Camera",
    price: "$145 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAou0OBZmXCww7mTZqJITjTHgAvlNcH1LJH8vL_iHA1vI5HABxEPvLxcK0YnNmGuUq-R3mPh9TLtPh0oiCD0IrrgCBEEbOMktn8fhOBNwtYdeymeH9I9sttUz34wNVDT7CHTwDOYT4uMIKdiWEIl7b1XLZCi83L5MuI7p_AouDLkGUJlHlnmct1bKHmlEKq7ZEBWf25tdxyAYLO7qpy4nPOiWM8tX6OPukQlJ273NFTap0fWtFv2zkKxuEY88rlLfOFJUkvG1DBwner",
    rating: 4.9,
    status: "Available",
    isVideo: false
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M3 Max",
    description: "128GB RAM, 8TB SSD",
    price: "$85 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY2k5Dt7nEQe37VI-YKJFBhJIsADaIEUlV8mkbVYeHYPBV0qMZc5LakhrYGfrPb4Q7e0HJ5cHGSzneSDCpuZP0uCiBj1C6qDZrhbW4Z7efubTtINSZH0cGZFDvjzRFTCLmIXiNKTPoPJRxHLvPtrPVX_NoQbuZ4kSLez9shnAJPlX2F5uUZYa66U96jMLzm1Ang6cz5Cf9AUbns1M6XgJWB7aTBHAIU13sDouYSqEYd7sbtM4bgLspEOmIO9JeOUOAyhpLkfXeJgIt",
    rating: 5.0,
    status: "Available",
    isVideo: false
  },
  {
    id: 3,
    name: "Herman Miller Aeron",
    description: "Remastered, Size B, Graphite",
    price: "$25 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFtyLT5AT8oSWbiq3YWRSO4ph3y2khE_5aSLcj7nvHIkqVhorzGY-rRFwrdxrHuZzRhUo1ZaJcEvh3ikk0J74otxl29G4nCkrpuDk9803_kib23yn4IlTM0zt76YrBzXNRqniVIFPA_ZKJjKTmpgb3oULZbmzSTwNkDhsxW4jCITMiBlWGwFWhjTFz485j6V66xU0-En7OeQRnNeoBrahXyS40kPbHaYs4nXn4HWgnd6q-92mfj8Z5pHZaA7sED0E_3C0tJRWdvcNB",
    rating: 4.8,
    status: "Low Stock",
    isVideo: false
  },
  {
    id: 4,
    name: "RED V-RAPTOR 8K",
    description: "vv + 6K S35",
    price: "$450 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAou0OBZmXCww7mTZqJITjTHgAvlNcH1LJH8vL_iHA1vI5HABxEPvLxcK0YnNmGuUq-R3mPh9TLtPh0oiCD0IrrgCBEEbOMktn8fhOBNwtYdeymeH9I9sttUz34wNVDT7CHTwDOYT4uMIKdiWEIl7b1XLZCi83L5MuI7p_AouDLkGUJlHlnmct1bKHmlEKq7ZEBWf25tdxyAYLO7qpy4nPOiWM8tX6OPukQlJ273NFTap0fWtFv2zkKxuEY88rlLfOFJUkvG1DBwner", 
    rating: 5.0,
    status: "Out of Stock",
    isVideo: true
  },
  {
    id: 5,
    name: "DJI Mavic 3 Pro",
    description: "Triple Lens Flagship Drone",
    price: "$65 / day",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSIub7x4JXVEReUpk0nG93JGvbhJfvD1tVAEZmL4pK8adSGzJ3E8vXAGyClpu0VztGGEpDv8_QB17jcr3iO6lZh8GyP2qecRFShgQkxHS0Bb9s4-p__kcbpPbtYSukWqUW7ZXU4S_v03g-ishBiHUahFE1UjBPK_aN59fcxFSLob1b9oD-HKcazQeAssPfLwpUJLYkJfCkvpD_gFL5kSzlqOvKSnBAX4t_Nk6fx87jXNNal4vmpYjRgG1ThlwRSxrP1I-895QlHZzV",
    rating: 4.7,
    status: "Available",
    isVideo: true
  },
  {
      id: 6,
      name: "Profoto B10X",
      description: "Lights & Modification",
      price: "$40 / hour",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyUev10S7kj_86wDsCCz1L65okouH0_W5ycNwEUZhfnRL7S5xfhBXz77Jm_6s0DlhwNNllAXsylYldDw3vFAJC17Th54Gj0yWs-ne-NpMfdSjxSnG06yRGOVISvX2kO3WP0finoMc-hcG9WRGcldqResmpePpozbKRv4xnzzkpfVIvMpBsfjolOdjJAtdwbyS_b9RSuqv09QKzmV2rmJXhiciLekLsjSlmcyiNYn7qLScDAhWickSpKav9rmkXQx92HkGI5Y0bxt30",
      rating: 4.9,
      status: "Available",
      isVideo: false
  }
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendor-signup" element={<VendorSignup />} />
    </Routes>
  )
}

export default App