// src/vendor/pages/Pickups.jsx
import { useState } from 'react';

const Pickups = () => {
  const [pickups] = useState([
    { id: 'P001', order: '#1001', customer: 'John Doe', items: 2, date: '2026-01-30', time: '10:00 AM', status: 'Scheduled' },
    { id: 'P002', order: '#1002', customer: 'Jane Smith', items: 1, date: '2026-01-30', time: '2:00 PM', status: 'In Transit' },
    { id: 'P003', order: '#1003', customer: 'Bob Johnson', items: 3, date: '2026-01-29', time: '11:00 AM', status: 'Completed' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pickups</h1>
          <p className="text-slate-600 mt-1">Manage equipment pickup schedules.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Schedule Pickup
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Pickup ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pickups.map((pickup) => (
                <tr key={pickup.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{pickup.id}</td>
                  <td className="px-6 py-4 text-slate-600">{pickup.order}</td>
                  <td className="px-6 py-4 text-slate-900">{pickup.customer}</td>
                  <td className="px-6 py-4 text-slate-900">{pickup.items}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{pickup.date} {pickup.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      pickup.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      pickup.status === 'In Transit' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {pickup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Documents</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pickups;
