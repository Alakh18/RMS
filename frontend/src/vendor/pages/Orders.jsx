// src/vendor/pages/Orders.jsx
import { useState } from 'react';

const Orders = () => {
  const [orders] = useState([
    { id: 1001, customer: 'John Doe', items: 2, total: 450, status: 'Confirmed', date: '2026-01-28' },
    { id: 1002, customer: 'Jane Smith', items: 1, total: 145, status: 'Pickup', date: '2026-01-27' },
    { id: 1003, customer: 'Bob Johnson', items: 3, total: 290, status: 'Returned', date: '2026-01-25' },
  ]);

  const statusColors = {
    Draft: 'bg-gray-100 text-gray-700',
    Confirmed: 'bg-blue-100 text-blue-700',
    Pickup: 'bg-orange-100 text-orange-700',
    Returned: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-1">Track rental lifecycle and manage inventory.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">#{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-900">{order.items}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
