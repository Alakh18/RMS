// src/vendor/layout/VendorSidebar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const VendorSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/vendor', icon: 'dashboard' },
    { label: 'Products', path: '/vendor/products', icon: 'inventory_2' },
    { label: 'Orders', path: '/vendor/orders', icon: 'shopping_cart' },
    { label: 'Quotations', path: '/vendor/quotations', icon: 'description' },
    { label: 'Pickups', path: '/vendor/pickups', icon: 'local_shipping' },
    { label: 'Returns', path: '/vendor/returns', icon: 'assignment_return' },
    { label: 'Invoices', path: '/vendor/invoices', icon: 'receipt_long' },
    { label: 'Reports', path: '/vendor/reports', icon: 'bar_chart' },
    { label: 'Settings', path: '/vendor/settings', icon: 'settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col overflow-y-auto
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <h3 className="font-bold text-slate-900">RentalPro</h3>
              <p className="text-xs text-slate-500">Vendor Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200 ease-in-out
                ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 text-center">
            <p>© 2026 RentalPro</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default VendorSidebar;
