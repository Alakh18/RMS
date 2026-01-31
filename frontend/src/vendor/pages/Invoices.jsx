// src/vendor/pages/Invoices.jsx
import { useState, useEffect } from 'react';
import { fetchInvoices, downloadInvoice } from '../services/vendorApi';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetchInvoices();
      if (response.success) {
        setInvoices(response.data);
      }
    } catch (err) {
      console.error('Error loading invoices:', err);
      setError('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (invoiceId) => {
    try {
      setDownloading(true);
      const blob = await downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading invoice:', err);
      alert('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-orange-100 text-orange-700';
      case 'PARTIALLY_PAID':
        return 'bg-blue-100 text-blue-700';
      case 'OVERDUE':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading invoices...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
        <p className="text-slate-600 mt-1">Manage invoices, payments, and GST calculations.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No invoices yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Invoice</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Paid</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.map((invoice) => {
                  const customerName = invoice.order.customer
                    ? `${invoice.order.customer.firstName} ${invoice.order.customer.lastName}`
                    : 'Unknown';
                  const paidAmount = parseFloat(invoice.paidAmount);
                  const totalAmount = parseFloat(invoice.totalAmount);

                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{invoice.invoiceNumber}</td>
                      <td className="px-6 py-4 text-slate-600">{invoice.order.orderNumber}</td>
                      <td className="px-6 py-4 text-slate-600">{customerName}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        ₹{paidAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(invoice.id)}
                            disabled={downloading}
                            className="text-green-600 hover:text-green-700 font-medium text-sm disabled:text-gray-400"
                          >
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Invoice Details</h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Invoice Number</p>
                  <p className="text-lg font-bold text-slate-900">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Order Number</p>
                  <p className="text-slate-900">{selectedInvoice.order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Due Date</p>
                  <p className="text-slate-900">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Customer</h3>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-slate-900">
                    {selectedInvoice.order.customer
                      ? `${selectedInvoice.order.customer.firstName} ${selectedInvoice.order.customer.lastName}`
                      : 'Unknown'}
                  </p>
                  {selectedInvoice.order.customer?.email && (
                    <p className="text-slate-600 text-sm">{selectedInvoice.order.customer.email}</p>
                  )}
                  {selectedInvoice.order.customer?.companyName && (
                    <p className="text-slate-600 text-sm">{selectedInvoice.order.customer.companyName}</p>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Items</h3>
                <div className="space-y-2">
                  {selectedInvoice.order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{item.product.name}</p>
                        <p className="text-sm text-slate-600">
                          Qty: {item.quantity} × ₹{parseFloat(item.priceAtBooking).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p className="font-medium text-slate-900">
                        ₹{(parseFloat(item.priceAtBooking) * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ₹{(parseFloat(selectedInvoice.totalAmount) - parseFloat(selectedInvoice.taxAmount) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax Amount</span>
                  <span className="font-medium text-slate-900">
                    ₹{parseFloat(selectedInvoice.order.taxAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="font-bold text-slate-900">
                    ₹{parseFloat(selectedInvoice.totalAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="text-slate-600">Paid Amount</span>
                  <span className="font-medium text-green-700">
                    ₹{parseFloat(selectedInvoice.paidAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Balance</span>
                  <span className={`font-medium ${parseFloat(selectedInvoice.balanceAmount) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                    ₹{parseFloat(selectedInvoice.balanceAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(selectedInvoice.id)}
                  disabled={downloading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
                >
                  {downloading ? 'Downloading...' : 'Download PDF'}
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
