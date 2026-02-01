import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  // Get user data from local storage and merge saved profile overrides
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const profileOverrides = JSON.parse(localStorage.getItem('profileOverrides')) || {};
  const emailKey = storedUser?.email ? storedUser.email.trim().toLowerCase() : null;
  const overrideData = emailKey ? profileOverrides[emailKey] : null;
  const user = storedUser
    ? { ...storedUser, ...overrideData }
    : {
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
        role: 'VISITOR'
      };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased flex flex-col">
      <Navbar />
      
      {/* Main Content Area with Gradient Background */}
      <div className="flex-1 pt-32 pb-20 px-4 hero-gradient flex flex-col items-center">
        
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Sticky Profile Card */}
          <div className="md:col-span-1">
            <div className="glass-panel rounded-3xl p-8 shadow-glass sticky top-32 border-white/40 overflow-hidden relative">
              {/* Decorative Background Blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="flex flex-col items-center text-center">
                {/* Avatar with Verification Badge */}
                <div className="relative mb-6 group cursor-pointer">
                  <div className="size-28 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center text-white shadow-glow transform group-hover:scale-105 transition-all duration-300">
                    {/* Using Initials or Icon */}
                    <span className="text-3xl font-bold">
                      {user.firstName ? user.firstName[0] : ''}{user.lastName ? user.lastName[0] : ''}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-slate-100">
                     <span className="material-symbols-outlined text-[20px] text-green-500 font-bold">verified</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm font-medium text-slate-500 mb-6 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">
                  {user.email}
                </p>
                
                {/* Action Buttons */}
                <div className="w-full space-y-3">
                  <button 
                    onClick={() => navigate('/edit-profile')}
                    className="w-full bg-slate-900 hover:bg-black text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-slate-900/20 flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">edit_square</span>
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-white border border-red-100 text-red-600 hover:bg-red-50 text-sm font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">logout</span>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Dashboard Stats */}
          <div className="md:col-span-2 space-y-6">
            
            {/* 1. Quick Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl border-white/40 flex flex-col gap-1 hover:border-primary/30 transition-colors group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Rentals</span>
                </div>
                <span className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors">0</span>
              </div>
              <div className="glass-panel p-6 rounded-2xl border-white/40 flex flex-col gap-1 hover:border-primary/30 transition-colors group">
                 <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </span>
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Spent</span>
                </div>
                <span className="text-3xl font-black text-slate-900 group-hover:text-green-600 transition-colors">₹0</span>
              </div>
            </div>

            {/* 2. Personal Information Panel */}
            <div className="glass-panel p-8 rounded-3xl border-white/40 shadow-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                  Personal Information
                </h3>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/10">
                  {user.role || 'CUSTOMER'}
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">First Name</label>
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-bold text-slate-700">
                      {user.firstName || 'Not set'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-bold text-slate-700">
                      {user.lastName || 'Not set'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 flex items-center justify-between group">
                    {user.email}
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                       <span className="material-symbols-outlined text-[16px]">check_circle</span>
                       <span className="text-[10px] uppercase font-bold">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* 3. Recent Activity Placeholder */}
             <div className="glass-panel p-8 rounded-3xl border-white/40 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                  Recent Activity
                </h3>
                
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
                  <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-slate-400 text-[24px]">history</span>
                  </div>
                  <p className="text-slate-500 font-medium text-sm">No recent rental history found</p>
                  <button onClick={() => navigate('/products')} className="mt-4 text-primary font-bold text-sm hover:underline flex items-center gap-1">
                    Browse Marketplace
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
             </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;