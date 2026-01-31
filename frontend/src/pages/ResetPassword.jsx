import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/reset-password', { token, newPassword });
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Reset failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <div className="w-full max-w-[440px] glass-panel rounded-3xl p-8 shadow-glass">
        <h2 className="text-2xl font-black text-center mb-6 text-gradient">Set New Password</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-bold text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="password" 
            placeholder="New Password" 
            className="w-full px-5 py-3 rounded-xl border outline-none focus:border-primary"
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          />
          <button className="bg-primary text-white py-3 rounded-full font-bold shadow-lg">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;