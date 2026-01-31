import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 hero-gradient flex flex-col items-center justify-center">
        <div className="w-full max-w-[500px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40">
          
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="size-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white shadow-glow mb-2">
              <span className="material-symbols-outlined text-[40px]">person</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-gradient">My Profile</h2>
            <p className="text-slate-500 text-sm font-medium">Manage your RentalEco account</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">First Name</p>
                <div className="w-full px-5 py-3 rounded-xl bg-white/40 border border-slate-200 text-slate-900 font-semibold">
                  {user.firstName || 'N/A'}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Last Name</p>
                <div className="w-full px-5 py-3 rounded-xl bg-white/40 border border-slate-200 text-slate-900 font-semibold">
                  {user.lastName || 'N/A'}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</p>
              <div className="w-full px-5 py-3 rounded-xl bg-white/40 border border-slate-200 text-slate-900 font-semibold">
                {user.email || 'N/A'}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Account Role</p>
              <div className="w-full px-5 py-3 rounded-xl bg-white/40 border border-slate-200 text-primary font-bold">
                {user.role || 'CUSTOMER'}
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full bg-slate-900 hover:bg-black text-white text-sm font-bold px-6 py-4 rounded-full transition-all shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Profile
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full bg-white border border-red-100 text-red-600 hover:bg-red-50 text-sm font-bold px-6 py-4 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;