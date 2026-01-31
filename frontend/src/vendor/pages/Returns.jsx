// src/vendor/pages/Returns.jsx
import { useState } from 'react';

const Returns = () => {
  const [returns] = useState([
    { id: 'R001', order: '#1001', customer: 'John Doe', items: 2, expectedDate: '2026-02-04', status: 'Pending', lateFee: 0 },
    { id: 'R002', order: '#1005', customer: 'Alice Brown', items: 1, expectedDate: '2026-01-28', status: 'Late', lateFee: 145 },
    { id: 'R003', order: '#1003', customer: 'Bob Johnson', items: 3, expectedDate: '2026-01-25', status: 'Completed', lateFee: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Returns</h1>
        <p className="text-slate-600 mt-1">Process equipment returns and manage late fees.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Return ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Expected</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Late Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{ret.id}</td>
                  <td className="px-6 py-4 text-slate-600">{ret.order}</td>
                  <td className="px-6 py-4 text-slate-900">{ret.customer}</td>
                  <td className="px-6 py-4 text-slate-900">{ret.items}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{ret.expectedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ret.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      ret.status === 'Late' ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{ret.lateFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Returns;
