import { useState, useEffect } from 'react';
import { fetchQuotations, approveQuotation, rejectQuotation } from '../services/vendorApi';

const Quotations = () => {
  const [vendorQuotations, setVendorQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load Data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetchQuotations();
      if(response.success) {
         setVendorQuotations(response.data);
      }
    } catch (error) {
      console.error("Failed to load quotations", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Approve
  const handleApprove = async (id) => {
    if(!confirm("Approve this quotation? Stock will be reserved.")) return;
    try {
      await approveQuotation(id);
      alert("Quotation Approved!");
      loadData(); // Refresh list
    } catch (error) {
      // This will show the "Double Booking" error if stock is unavailable
      alert(error.response?.data?.error || "Failed to approve"); 
    }
  }

  // 3. Handle Reject
  const handleReject = async (id) => {
    if(!confirm("Reject this quotation?")) return;
    try {
      await rejectQuotation(id);
      loadData();
    } catch (error) {
      alert("Failed to reject");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
        <p className="text-slate-600 mt-1">Requests waiting for your approval.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {vendorQuotations.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                     <div className="font-bold text-slate-900">{q.customer?.firstName} {q.customer?.lastName}</div>
                     <div className="text-xs text-slate-500">{q.customer?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                     {q.items.map(i => (
                        <div key={i.id}>{i.product.name} (x{i.quantity})</div>
                     ))}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">₹{parseFloat(q.totalAmount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(q.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button 
                        onClick={() => handleApprove(q.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold hover:bg-green-200"
                    >
                        Approve
                    </button>
                    <button 
                        onClick={() => handleReject(q.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold hover:bg-red-200"
                    >
                        Reject
                    </button>
                  </td>
                </tr>
              ))}
              {vendorQuotations.length === 0 && (
                <tr>
                    <td colSpan="5" className="p-8 text-center text-slate-500">No pending quotations found.</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Quotations;