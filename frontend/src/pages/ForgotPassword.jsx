import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      setStatus({ type: 'success', msg: res.data.message });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to send link.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <div className="w-full max-w-[440px] glass-panel rounded-3xl p-8 shadow-glass">
        <h2 className="text-2xl font-black text-center mb-6 text-gradient">Forgot Password</h2>
        {status.msg && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center font-bold ${status.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-5 py-3 rounded-xl border outline-none focus:border-primary"
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button disabled={loading} className="bg-primary text-white py-3 rounded-full font-bold shadow-lg disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-bold text-primary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;