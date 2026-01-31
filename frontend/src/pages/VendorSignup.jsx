import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorSignup = () => {
  const navigate = useNavigate();

  // State keys match the Prisma schema fields exactly
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    gstin: '',            // Matches Prisma schema
    productCategory: '',  // Matches Prisma schema
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Updated to Port 3000 as per your latest request
  const API_BASE_URL = 'http://localhost:3000/api/auth'; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        ...formData,
        role: 'VENDOR' // Hardcoded role for this page
      });

      if (response.status === 201) {
        alert('Vendor registered successfully! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      // Safely access error message
      const errorMessage = err.response?.data?.error || 'Registration failed. Please check your backend connection.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 hero-gradient font-display antialiased text-[#0d131c]">
      <div className="w-full max-w-[600px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40">
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="size-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-glow mb-2">
            <span className="material-symbols-outlined text-[20px]">storefront</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Vendor Registration</h2>
          <p className="text-slate-500 text-sm font-medium">Start renting your assets on RentalEco</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Company Name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">GST No</label>
                {/* Name attribute matches Prisma schema 'gstin' */}
                <input name="gstin" value={formData.gstin} onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Product Category</label>
            <div className="relative">
                {/* FIXED: Removed 'selected' from option. Added 'value' to select. */}
                <select 
                    name="productCategory" 
                    value={formData.productCategory} 
                    onChange={handleChange} 
                    className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer" 
                    required
                >
                    <option value="" disabled>Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="audio">Audio & Sound</option>
                    <option value="other">Other</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email ID</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Confirm Password</label>
                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
          </div>

          <button disabled={loading} type="submit" className="mt-4 w-full bg-slate-900 hover:bg-black text-white text-sm font-bold px-6 py-4 rounded-full transition-all shadow-lg hover:shadow-slate-900/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70">
            {loading ? 'Registering...' : 'Register as Vendor'}
            {!loading && <span className="material-symbols-outlined text-[18px]">store</span>}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-medium text-slate-600">
          Not a vendor?{' '}
          <Link to="/signup" className="text-primary font-bold hover:text-primary-dark hover:underline transition-all">
            Join as User
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VendorSignup;