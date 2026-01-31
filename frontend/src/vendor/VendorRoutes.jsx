// src/vendor/VendorRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import VendorLayout from './layout/VendorLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Quotations from './pages/Quotations';
import Invoices from './pages/Invoices';
import Pickups from './pages/Pickups';
import Returns from './pages/Returns';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Protected Route wrapper for vendor-only access
const ProtectedVendorRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user.role !== 'VENDOR') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const VendorRoutes = () => {
  return (
    <ProtectedVendorRoute>
      <VendorLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/vendor/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/vendor/dashboard" replace />} />
        </Routes>
      </VendorLayout>
    </ProtectedVendorRoute>
  );
};

export default VendorRoutes;
