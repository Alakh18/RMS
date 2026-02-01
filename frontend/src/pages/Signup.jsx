import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false); // New state for Terms agreement

  const API_BASE_URL = 'http://localhost:3000/api/auth'; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation: Check passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validation: Check if Terms are agreed
    if (!agreed) {
      setError("You must agree to the Terms and Conditions to register.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        ...formData,
        role: 'CUSTOMER' // Explicitly a customer
      });

      if (response.status === 201) {
        alert('Account created! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 hero-gradient font-display antialiased text-[#0d131c]">
      <div className="w-full max-w-[500px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40">
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="size-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-glow mb-2">
            <span className="material-symbols-outlined text-[20px]">hexagon</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-gradient">Create Account</h2>
          <p className="text-slate-500 text-sm font-medium">Join RentalEco today</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">First Name</label>
              <input name="firstName" onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Last Name</label>
              <input name="lastName" onChange={handleChange} type="text" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email ID</label>
            <input name="email" onChange={handleChange} type="email" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
            <input name="password" onChange={handleChange} type="password" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Confirm Password</label>
            <input name="confirmPassword" onChange={handleChange} type="password" className="w-full px-5 py-3 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" required />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center gap-3 ml-1">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none font-medium">
              I agree to the <Link to="/terms" target="_blank" className="text-primary font-bold hover:underline">Terms and Conditions</Link>
            </label>
          </div>

          <button disabled={loading} type="submit" className="mt-2 w-full bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-4 rounded-full transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70">
            {loading ? 'Creating Account...' : 'Register'}
            {!loading && <span className="material-symbols-outlined text-[18px]">person_add</span>}
          </button>
        </form>

        <div className="mt-2 pt-4 border-t border-slate-200/60 w-full text-center">
          <p className="text-xs text-slate-500 mb-1">Want to list your products?</p>
          <Link to="/vendor-signup" className="text-sm font-bold text-slate-700 hover:text-primary transition-colors flex items-center justify-center gap-1 group">
            Become a Vendor 
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;