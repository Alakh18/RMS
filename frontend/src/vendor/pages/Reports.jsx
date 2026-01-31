// src/vendor/pages/Reports.jsx
import { useState } from 'react';

const Reports = () => {
  const [dateRange, setDateRange] = useState({ start: '2026-01-01', end: '2026-01-31' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-600 mt-1">Analyze business performance and earnings.</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter by Date</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
          />
          <span className="self-center text-slate-600">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-lg"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
            Generate
          </button>
        </div>
      </div>

      {/* Reports Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-green-600">₹45,230</p>
          <p className="text-sm text-slate-500 mt-2">↑ 12% from last period</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Rentals Completed</h3>
          <p className="text-3xl font-bold text-blue-600">28</p>
          <p className="text-sm text-slate-500 mt-2">Across all products</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Avg Rental Duration</h3>
          <p className="text-3xl font-bold text-purple-600">3.2 days</p>
          <p className="text-sm text-slate-500 mt-2">Customer average</p>
        </div>
      </div>

      {/* Most Rented Products */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Most Rented Products</h2>
        <div className="space-y-3">
          {[
            { name: 'Sony FX6 Cinema Camera', rentals: 12, revenue: 1740 },
            { name: 'MacBook Pro 16"', rentals: 8, revenue: 680 },
            { name: 'DJI Mavic 3 Pro', rentals: 5, revenue: 325 },
          ].map((product, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">{product.name}</p>
                <p className="text-sm text-slate-500">{product.rentals} rentals</p>
              </div>
              <p className="font-semibold text-slate-900">₹{product.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
