// src/vendor/pages/Quotations.jsx
import { useState } from 'react';

const Quotations = () => {
  const initialQuotations = [
    { id: 'Q001', customer: 'ABC Corp', amount: 8500, status: 'Pending', date: '2026-01-29' },
    { id: 'Q002', customer: 'XYZ Studios', amount: 15000, status: 'Approved', date: '2026-01-28' },
    { id: 'Q003', customer: 'Tech Solutions', amount: 5200, status: 'Rejected', date: '2026-01-27' },
  ];

  const [vendorQuotations, setVendorQuotations] = useState(initialQuotations);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
        <p className="text-slate-600 mt-1">Review and manage customer quotations.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Quote ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vendorQuotations.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{q.id}</td>
                  <td className="px-6 py-4 text-slate-600">{q.customer}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{q.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        q.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : q.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{q.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View</button>
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

  export default Quotations;
