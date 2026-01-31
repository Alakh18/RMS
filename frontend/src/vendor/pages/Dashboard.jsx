// src/vendor/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../services/vendorApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: '0',
    activeRentals: 0,
    pendingReturns: 0,
    monthlyEarnings: '0',
    recentOrders: [],
    pendingActions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await fetchDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Error loading stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: 'inventory_2',
      color: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: 'shopping_cart',
      color: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Total Revenue',
      value: `₹${parseFloat(stats.totalRevenue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      icon: 'attach_money',
      color: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      title: 'Active Rentals',
      value: stats.activeRentals,
      icon: 'local_shipping',
      color: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">{error}</div>
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
          {stats.recentOrders.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No recent orders</p>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{order.orderNumber || `#${order.id}`}</p>
                    <p className="text-sm text-slate-500">
                      {order.customer} • {order.items} {order.items === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'PICKED_UP'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'RETURNED'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'CONFIRMED'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Pending Actions</h2>
          {stats.pendingActions.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No pending actions</p>
          ) : (
            <div className="space-y-4">
              {stats.pendingActions.map((action, idx) => (
                <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm font-medium text-orange-900">{action.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">This Month</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-slate-600">Monthly Earnings</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              ₹{parseFloat(stats.monthlyEarnings).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Pending Returns</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.pendingReturns}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Active Products</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
