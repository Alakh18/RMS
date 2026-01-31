// src/vendor/pages/Products.jsx
import { useState, useEffect } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  publishProduct,
} from '../services/vendorApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    pricingType: 'DAILY',
    price: '',
    securityDeposit: '',
    quantity: '',
    isRentable: true,
    isPublished: false,
    attributes: [],
    images: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        brand: product.brand || '',
        pricingType: product.pricingType,
        price: product.price,
        securityDeposit: product.securityDeposit,
        quantity: product.quantity.toString(),
        isRentable: product.isRentable,
        isPublished: product.isPublished,
        attributes: product.attributes || [],
        images: product.images || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        brand: '',
        pricingType: 'DAILY',
        price: '',
        securityDeposit: '',
        quantity: '',
        isRentable: true,
        isPublished: false,
        attributes: [],
        images: [],
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      brand: '',
      pricingType: 'DAILY',
      price: '',
      securityDeposit: '',
      quantity: '',
      isRentable: true,
      isPublished: false,
      attributes: [],
      images: [],
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index] = { ...newAttributes[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const handleAddAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { name: '', value: '' }],
    }));
  };

  const handleRemoveAttribute = (index) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { url: '', altText: '', isPrimary: prev.images.length === 0 }],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.price) errors.price = 'Price is required';
    if (isNaN(parseFloat(formData.price))) errors.price = 'Price must be a number';
    if (!formData.quantity) errors.quantity = 'Quantity is required';
    if (isNaN(parseInt(formData.quantity))) errors.quantity = 'Quantity must be a number';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        securityDeposit: formData.securityDeposit ? parseFloat(formData.securityDeposit) : 0,
        quantity: parseInt(formData.quantity),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }

      await loadProducts();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setSaving(true);
      await deleteProduct(productId);
      await loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.error || 'Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (product) => {
    try {
      setSaving(true);
      await publishProduct(product.id, !product.isPublished);
      await loadProducts();
    } catch (err) {
      console.error('Error toggling publish:', err);
      setError(err.response?.data?.error || 'Failed to update publish status');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Manage your rental inventory and pricing.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No products yet. Create your first product!</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Pricing Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">In Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-slate-500 mt-1">{product.description.substring(0, 50)}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">₹{parseFloat(product.price).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{product.pricingType}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{product.quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          product.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => handleTogglePublish(product)}
                      >
                        {product.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm text-slate-600">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          disabled={saving}
                        >
                          <span className="material-symbols-outlined text-sm text-red-600">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-500 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter product name"
                />
                {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Pricing Type and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Pricing Type
                  </label>
                  <select
                    name="pricingType"
                    value={formData.pricingType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="HOURLY">Hourly</option>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.price ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="0.00"
                  />
                  {formErrors.price && <p className="text-red-600 text-sm mt-1">{formErrors.price}</p>}
                </div>
              </div>

              {/* Security Deposit and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Security Deposit
                  </label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.quantity ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="0"
                  />
                  {formErrors.quantity && <p className="text-red-600 text-sm mt-1">{formErrors.quantity}</p>}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isRentable"
                    checked={formData.isRentable}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-900">Is Rentable</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-900">Publish Now</span>
                </label>
              </div>

              {/* Attributes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-900">
                    Attributes
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAttribute}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Attribute
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.attributes.map((attr, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Attribute name (e.g., Color)"
                        value={attr.name}
                        onChange={(e) => handleAttributeChange(idx, 'name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., Red)"
                        value={attr.value}
                        onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAttribute(idx)}
                        className="p-2 hover:bg-red-50 rounded-lg"
                      >
                        <span className="material-symbols-outlined text-sm text-red-600">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-slate-900">
                    Images
                  </label>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((image, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 rounded-lg space-y-2">
                      <input
                        type="text"
                        placeholder="Image URL (e.g., https://example.com/image.jpg)"
                        value={image.url || ''}
                        onChange={(e) => handleImageChange(idx, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Alt text (optional)"
                        value={image.altText || ''}
                        onChange={(e) => handleImageChange(idx, 'altText', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={image.isPrimary || false}
                            onChange={(e) => handleImageChange(idx, 'isPrimary', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium text-slate-900">Primary Image</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-2 hover:bg-red-50 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-sm text-red-600">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
