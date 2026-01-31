import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', // Email is usually read-only
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call delay
    setTimeout(() => {
      // 1. Get existing user data
      const existingUser = JSON.parse(localStorage.getItem('user'));

      // 2. Merge new data
      const updatedUser = { ...existingUser, ...formData };

      // 3. Save back to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // 4. Persist profile overrides by email (survive logout/login)
      if (updatedUser?.email) {
        const profileOverrides = JSON.parse(localStorage.getItem('profileOverrides')) || {};
        const emailKey = updatedUser.email.trim().toLowerCase();
        profileOverrides[emailKey] = {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName
        };
        localStorage.setItem('profileOverrides', JSON.stringify(profileOverrides));
      }

      setLoading(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4 hero-gradient flex flex-col items-center justify-center">
        <div className="w-full max-w-[500px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                <input 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  type="text" 
                  className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                <input 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  type="text" 
                  className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                Email Address 
                <span className="text-slate-400 font-normal normal-case ml-2">(Cannot be changed)</span>
              </label>
              <input 
                name="email" 
                value={formData.email} 
                type="email" 
                className="w-full px-5 py-3.5 rounded-xl bg-slate-100/50 border border-slate-200 text-slate-500 text-sm font-medium outline-none cursor-not-allowed" 
                disabled 
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold px-6 py-4 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={loading} 
                type="submit" 
                className="flex-[2] bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Save Changes'}
                {!loading && <span className="material-symbols-outlined text-[18px]">check</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;