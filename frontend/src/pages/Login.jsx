import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:3000/api/auth'; 

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // 1. Save Token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert(`Welcome back, ${data.user.firstName}!`);

      // 2. ✅ CHECK ROLE & REDIRECT CORRECTLY
      if (data.user.role === 'ADMIN') {
        navigate('/admin'); // Go to Dashboard
      } else {
        navigate('/');      // Go to Home
      }

    } else {
      setError(data.error || 'Login failed');
    }
  } catch (error) {
    console.error("Error:", error);
    setError('An error occurred during login');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 hero-gradient font-display antialiased text-[#0d131c]">
      <div className="w-full max-w-[440px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40">
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="size-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-glow mb-2">
            <span className="material-symbols-outlined text-[24px]">hexagon</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-gradient">Welcome Back</h2>
          <p className="text-slate-500 text-sm font-medium">Sign in to RentalEco</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded-lg text-center font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">
              Login ID / Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="name@example.com"
              className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" size="sm" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                Forgot Password?
              </Link>
              </div>
           <input
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="mt-4 w-full bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-4 rounded-full transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Log In'}
            {!loading && <span className="material-symbols-outlined text-[18px]">login</span>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-600">
          New to RentalEco?{' '}
          <Link to="/signup" className="text-primary font-bold hover:text-primary-dark hover:underline transition-all">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;