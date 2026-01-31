// src/pages/Login.jsx
import React from 'react';

const Login = () => {
  return (
    // Container: Uses the same 'hero-gradient' and font styles from App.jsx for consistency
    <div className="min-h-screen w-full flex items-center justify-center p-4 hero-gradient font-display antialiased text-[#0d131c]">
        
      {/* Login Card: 
        - Adapted from the wireframe's centered card.
        - Uses the existing '.glass-panel' CSS class for the frosted glass effect.
        - Added rounded-3xl and shadow-glass to match the header style.
      */}
      <div className="w-full max-w-[440px] glass-panel rounded-3xl p-8 md:p-10 shadow-glass relative overflow-hidden border-white/40">
        
        {/* Background ambient blobs (optional, for extra polish consistent with hero) */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Header Section containing Logo and Title */}
        <div className="flex flex-col items-center gap-3 mb-10">
          {/* Reused Logo Icon from App.jsx header */}
          <div className="size-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-glow mb-2">
            <span className="material-symbols-outlined text-[24px]">hexagon</span>
          </div>
          {/* Title using the existing 'text-gradient' class */}
          <h2 className="text-3xl font-black tracking-tight text-gradient">Welcome Back</h2>
          <p className="text-slate-500 text-sm font-medium">Sign in to RentalEco</p>
        </div>

        {/* The Login Form */}
        <form className="flex flex-col gap-5">
          
          {/* Login ID Input */}
          <div className="space-y-2">
            <label htmlFor="loginId" className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider text-[11px]">
              Login ID / Email
            </label>
            {/* Input style: Semi-transparent white bg, soft border, primary color focus ring */}
            <input
              id="loginId"
              type="email"
              placeholder="name@example.com"
              className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
                 <label htmlFor="password" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Password
                </label>
                 {/* "Forgot Password?" link from wireframe */}
                 <a href="#" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                  Forgot Password?
                 </a>
            </div>
           <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-slate-200 text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          {/* Uses the exact same styling as the "Start Renting" button in your header */}
          <button
            type="submit"
            className="mt-4 w-full bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-4 rounded-full transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Log In
            <span className="material-symbols-outlined text-[18px]">login</span>
          </button>
        </form>

        {/* Footer "Register" link from wireframe */}
        <div className="mt-8 text-center text-sm font-medium text-slate-600">
          New to RentalEco?{' '}
          <a href="#" className="text-primary font-bold hover:text-primary-dark hover:underline transition-all">
            Register Here
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;