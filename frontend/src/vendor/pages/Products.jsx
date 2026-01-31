// src/vendor/pages/Products.jsx
import { useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Sony FX6 Cinema Camera',
      category: 'Cameras',
      price: 145,
      pricing: 'Day',
      quantity: 5,
      reserved: 2,
      status: 'Published',
    },
    {
      id: 2,
      name: 'MacBook Pro 16" M3',
      category: 'Computers',
      price: 85,
      pricing: 'Day',
      quantity: 3,
      reserved: 1,
      status: 'Published',
    },
    {
      id: 3,
      name: 'DJI Mavic 3 Pro',
      category: 'Drones',
      price: 65,
      pricing: 'Day',
      quantity: 2,
      reserved: 0,
      status: 'Draft',
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage your rental inventory and pricing.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Pricing</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">In Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Reserved</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">₹{product.price}/{product.pricing}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{product.reserved}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm text-slate-600">edit</span>
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm text-slate-600">delete</span>
                      </button>
                    </div>
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

export default Products;
