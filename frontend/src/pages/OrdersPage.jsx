// src/pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulate API fetch from LocalStorage
    setTimeout(() => {
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      // Sort by newest first
      const sortedOrders = storedOrders.reverse();
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(order => 
        (order.status || 'confirmed').toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  }, [activeFilter, searchQuery, orders]);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': 
        return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200';
      case 'active': 
        return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200';
      case 'completed': 
        return 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200';
      case 'cancelled': 
        return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200';
      case 'processing':
        return 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200';
      default: 
        return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'check_circle';
      case 'active': return 'autorenew';
      case 'completed': return 'task_alt';
      case 'cancelled': return 'cancel';
      case 'processing': return 'pending';
      default: return 'check_circle';
    }
  };

  const filterTabs = [
    { label: 'All Orders', value: 'all', icon: 'list_alt' },
    { label: 'Confirmed', value: 'confirmed', icon: 'check_circle' },
    { label: 'Active', value: 'active', icon: 'autorenew' },
    { label: 'Completed', value: 'completed', icon: 'task_alt' },
    { label: 'Cancelled', value: 'cancelled', icon: 'cancel' }
  ];

  const getOrderStats = () => {
    return {
      total: orders.length,
      confirmed: orders.filter(o => (o.status || 'confirmed').toLowerCase() === 'confirmed').length,
      active: orders.filter(o => (o.status || 'confirmed').toLowerCase() === 'active').length,
      completed: orders.filter(o => (o.status || 'confirmed').toLowerCase() === 'completed').length,
      cancelled: orders.filter(o => (o.status || 'confirmed').toLowerCase() === 'cancelled').length,
      totalSpent: orders.reduce((sum, order) => sum + (order.total || 0), 0)
    };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-12 px-6 hero-gradient overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-4">
                <span className="text-2xl">📦</span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Order Management
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3">
                My <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Orders</span>
              </h1>
              <p className="text-lg text-slate-600">
                Track and manage your rental history
              </p>
            </div>
            
            <Link
              to="/products"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
              Rent More Gear
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            <div className="glass-panel p-5 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-[20px]">list_alt</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stats.total}</p>
                  <p className="text-xs text-slate-600 font-medium">Total Orders</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                  <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stats.confirmed}</p>
                  <p className="text-xs text-slate-600 font-medium">Confirmed</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                  <span className="material-symbols-outlined text-blue-600 text-[20px]">autorenew</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stats.active}</p>
                  <p className="text-xs text-slate-600 font-medium">Active</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
                  <span className="material-symbols-outlined text-slate-600 text-[20px]">task_alt</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">{stats.completed}</p>
                  <p className="text-xs text-slate-600 font-medium">Completed</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all col-span-2 md:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg">
                  <span className="material-symbols-outlined text-amber-600 text-[20px]">payments</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">₹{stats.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-slate-600 font-medium">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-white/40 shadow-lg">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by order ID or product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="glass-panel p-2 rounded-2xl border border-white/40 shadow-lg overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                      activeFilter === tab.value
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-panel h-64 rounded-3xl animate-pulse border border-white/40"></div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="glass-panel p-16 rounded-3xl text-center border border-white/40 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-slate-400 text-5xl">
                  {searchQuery || activeFilter !== 'all' ? 'search_off' : 'shopping_bag'}
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {searchQuery || activeFilter !== 'all' ? 'No Orders Found' : 'No Orders Yet'}
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                {searchQuery || activeFilter !== 'all' 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'You haven\'t rented anything yet. Check out our catalog to find the perfect gear for your needs.'
                }
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {(searchQuery || activeFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-primary transition-all"
                  >
                    Clear Filters
                  </button>
                )}
                <Link 
                  to="/products" 
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all inline-flex items-center gap-3"
                >
                  <span>Browse Products</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="glass-panel rounded-3xl border border-white/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  
                  {/* Order Header */}
                  <div className="px-6 py-5 bg-gradient-to-r from-slate-50/50 to-slate-100/50 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div>
                        <p className="text-slate-500 mb-1 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                          Order Placed
                        </p>
                        <p className="font-bold text-slate-900">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">payments</span>
                          Total Amount
                        </p>
                        <p className="font-black text-primary text-lg">₹{order.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">tag</span>
                          Order ID
                        </p>
                        <p className="font-mono text-slate-900 font-bold">#{order.id}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-sm font-bold border-2 uppercase tracking-wide flex items-center gap-2 ${getStatusColor(order.status || 'confirmed')}`}>
                      <span className="material-symbols-outlined text-[18px] filled">{getStatusIcon(order.status || 'confirmed')}</span>
                      {order.status || 'Confirmed'}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 space-y-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-6 p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary/30 transition-all group/item">
                        
                        {/* Image */}
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="relative w-full md:w-32 h-48 md:h-32 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200 shrink-0 group-hover/item:border-primary transition-all"
                        >
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <Link 
                                to={`/product/${item.product.id}`}
                                className="block group-hover/item:text-primary transition-colors"
                              >
                                <h3 className="text-xl font-black text-slate-900 mb-1 line-clamp-2">{item.product.name}</h3>
                              </Link>
                              <p className="text-sm text-slate-600 flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded">
                                  {item.product.brand || item.product.category}
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="font-semibold">Quantity: {item.quantity}</span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-primary">₹{item.totalPrice?.toLocaleString()}</p>
                              {item.period && (
                                <p className="text-xs text-slate-500 font-medium">per {item.period}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 text-sm font-semibold text-blue-700 flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">event</span>
                              <span>
                                {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            {item.deliveryAddress && (
                              <div className="px-4 py-2 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 text-sm font-semibold text-amber-700 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                <span className="line-clamp-1">{item.deliveryAddress}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2">
                            <Link 
                              to={`/product/${item.product.id}`} 
                              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">refresh</span>
                              Rent Again
                            </Link>
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-primary transition-all flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">description</span>
                              View Invoice
                            </button>
                            <button className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-primary transition-all flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">support_agent</span>
                              Get Help
                            </button>
                            <button className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px]">keyboard_return</span>
                              Return Item
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Order Footer with Tracking */}
                  <div className="px-6 py-5 bg-gradient-to-r from-slate-50/50 to-slate-100/50 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-green-600 text-[20px] filled">local_shipping</span>
                        <span className="font-semibold text-slate-700">
                          {order.status === 'completed' ? 'Delivered Successfully' : 'Estimated Delivery: In Progress'}
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-white border-2 border-slate-200 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">timeline</span>
                        Track Order
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrdersPage;