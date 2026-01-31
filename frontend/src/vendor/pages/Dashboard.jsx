// src/vendor/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../services/vendorApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeRentals: 0,
    pendingReturns: 0,
    monthlyEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Simulated data for demo
        setStats({
          totalRevenue: 45230,
          activeRentals: 12,
          pendingReturns: 3,
          monthlyEarnings: 8950,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: 'attach_money',
      color: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Active Rentals',
      value: stats.activeRentals,
      icon: 'shopping_cart',
      color: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Pending Returns',
      value: stats.pendingReturns,
      icon: 'assignment_return',
      color: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      title: 'This Month',
      value: `₹${stats.monthlyEarnings.toLocaleString()}`,
      icon: 'trending_up',
      color: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's your rental business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
              <span className={`material-symbols-outlined ${stat.textColor}`}>{stat.icon}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{stat.title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Order #{1000 + item}</p>
                  <p className="text-sm text-slate-500">2 days ago</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Actions</h2>
          <div className="space-y-4">
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm font-medium text-orange-900">3 Returns Awaiting Acceptance</p>
              <p className="text-xs text-orange-700 mt-1">Process these by end of day</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">5 Quotations Pending Review</p>
              <p className="text-xs text-blue-700 mt-1">Approve or reject</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-purple-900">2 Pickups Scheduled Today</p>
              <p className="text-xs text-purple-700 mt-1">Generate documents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
