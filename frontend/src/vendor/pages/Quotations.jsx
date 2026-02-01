// src/vendor/pages/Quotations.jsx
import { useEffect, useState } from 'react';
import { fetchQuotations, approveQuotation, rejectQuotation } from '../services/vendorApi';

const Quotations = () => {
  const [vendorQuotations, setVendorQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadQuotations = async () => {
    try {
      setLoading(true);
      const response = await fetchQuotations();
      if (response.success) {
        setVendorQuotations(response.data);
      }
    } catch (err) {
      console.error('Error loading quotations:', err);
      setError('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotations();
  }, []);

  const handleApprove = async (id) => {
    await approveQuotation(id);
    loadQuotations();
  };

  const handleReject = async (id) => {
    await rejectQuotation(id);
    loadQuotations();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
        <p className="text-slate-600 mt-1">Review and manage customer quotations.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Loading quotations...</p>
            </div>
          ) : vendorQuotations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No quotations yet</p>
            </div>
          ) : (
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
                  <td className="px-6 py-4 font-medium text-slate-900">{q.orderNumber || `QTN-${q.id}`}</td>
                  <td className="px-6 py-4 text-slate-600">{q.customer}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">₹{parseFloat(q.amount).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        q.status === 'SENT'
                          ? 'bg-yellow-100 text-yellow-700'
                          : q.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {q.status === 'SENT' ? 'PENDING' : q.status === 'CONFIRMED' ? 'APPROVED' : 'REJECTED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{new Date(q.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View</button>
                      {q.status === 'SENT' && (
                        <>
                          <button
                            onClick={() => handleApprove(q.id)}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(q.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

  export default Quotations;
