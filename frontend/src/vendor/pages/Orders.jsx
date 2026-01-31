// src/vendor/pages/Orders.jsx
import { useState, useEffect } from 'react';
import { fetchOrders } from '../services/vendorApi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-700';
      case 'PICKED_UP':
        return 'bg-orange-100 text-orange-700';
      case 'RETURNED':
        return 'bg-green-100 text-green-700';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-1">Track rental lifecycle and manage inventory.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No orders yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Order Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => {
                  const startDate = new Date(order.startDate).toLocaleDateString();
                  const endDate = new Date(order.endDate).toLocaleDateString();
                  const customerName = order.customer
                    ? `${order.customer.firstName} ${order.customer.lastName}`
                    : 'Unknown';

                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-slate-600">{customerName}</td>
                      <td className="px-6 py-4 text-slate-900">{order.items.length}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        ₹{parseFloat(order.totalAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {startDate} to {endDate}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Order Number</p>
                  <p className="text-lg font-bold text-slate-900">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Customer</p>
                  <p className="text-lg font-bold text-slate-900">
                    {selectedOrder.customer
                      ? `${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`
                      : 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Amount</p>
                  <p className="text-lg font-bold text-slate-900">
                    ₹{parseFloat(selectedOrder.totalAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Rental Start Date</p>
                  <p className="text-slate-900">{new Date(selectedOrder.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Rental End Date</p>
                  <p className="text-slate-900">{new Date(selectedOrder.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-slate-900">{item.product.name}</p>
                          <p className="text-sm text-slate-600 mt-1">{item.product.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">
                            ₹{parseFloat(item.priceAtBooking).toLocaleString('en-IN')} × {item.quantity}
                          </p>
                          <p className="text-sm text-slate-600">
                            Total: ₹{(parseFloat(item.priceAtBooking) * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.pickupNotes && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Pickup Notes</h3>
                  <p className="text-slate-600">{selectedOrder.pickupNotes}</p>
                </div>
              )}
              {selectedOrder.returnNotes && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Return Notes</h3>
                  <p className="text-slate-600">{selectedOrder.returnNotes}</p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-2 bg-slate-200 text-slate-900 rounded-lg font-medium hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
