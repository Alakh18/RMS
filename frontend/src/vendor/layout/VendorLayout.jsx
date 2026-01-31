// src/vendor/layout/VendorLayout.jsx
import { useState } from 'react';
import VendorSidebar from './VendorSidebar';
import VendorNavbar from './VendorNavbar';

const VendorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="vendor-layout flex h-screen bg-slate-50">
      {/* Sidebar */}
      <VendorSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <VendorNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
