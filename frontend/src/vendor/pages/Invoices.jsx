// src/vendor/pages/Invoices.jsx
import { useState } from 'react';

const Invoices = () => {
  const initialInvoices = [
    { id: 'INV001', order: 'ORD001', amount: 8500, paid: 'Yes', date: '2026-01-28' },
    { id: 'INV002', order: 'ORD002', amount: 5200, paid: 'No', date: '2026-01-27' },
    { id: 'INV003', order: 'ORD003', amount: 12000, paid: 'Yes', date: '2026-01-26' },
  ];

  const [vendorInvoices, setVendorInvoices] = useState(initialInvoices);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
        <p className="text-slate-600 mt-1">Manage invoices, payments, and GST calculations.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vendorInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.order}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      inv.paid === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {inv.paid}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{inv.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Download</button>
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

export default Invoices;
