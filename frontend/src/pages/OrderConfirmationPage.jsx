import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { orderItems, subTotal, address, orderId } = location.state || {};

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);

    // Security redirect if accessed directly without data
    if (!orderItems) {
      navigate('/');
    }
  }, [orderItems, navigate]);

  const handlePrint = () => window.print();
  // For actual PDF download, you'd typically use a library like html2pdf.js or jspdf.
  // For now, we trigger the print dialog which allows "Save as PDF".
  const handleDownload = () => window.print();

  const gstAmount = subTotal ? subTotal * 0.18 : 0;
  const grandTotal = subTotal ? subTotal + gstAmount : 0;

  if (!orderItems) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-display text-[#0d131c]">
      {/* Hide Navbar during print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-family: 'Inter', sans-serif;
            }
            
            /* Hide web-only elements */
            .print\\:hidden, nav, footer, button, .no-print { 
              display: none !important; 
            }

            /* Main Container Reset */
            .print-container {
              width: 100%;
              max-width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }

            /* Typography Tweaks */
            h1 { font-size: 24pt !important; }
            h2 { font-size: 16pt !important; color: #334155 !important; }
            p, td, th { font-size: 10pt !important; color: #0f172a !important; }
            
            /* Table Styling */
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th { 
              background-color: #f1f5f9 !important; 
              color: #0f172a !important; 
              font-weight: bold;
              padding: 8px 4px;
              border-bottom: 2px solid #cbd5e1;
            }
            td { 
              padding: 8px 4px; 
              border-bottom: 1px solid #e2e8f0; 
            }
            tr:last-child td { border-bottom: none; }

            /* Avoid breaking inside elements */
            .avoid-break { page-break-inside: avoid; }
          }
        `}
      </style>

      <div className="pt-32 pb-20 px-4 sm:px-6 max-w-5xl mx-auto print:p-0 print:m-0 print:max-w-none print:w-full">
        
        {/* Web-Only Header & Buttons */}
        <div className="flex justify-between items-center gap-4 mb-6 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order Confirmation</h1>
            <p className="text-slate-500 text-sm mt-1">Your rental order has been placed successfully</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              className="px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download PDF
            </button>
            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-black transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print Invoice
            </button>
          </div>
        </div>

        {/* Web-Only Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-xl shadow-lg mb-6 flex items-center gap-4 print:hidden">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">Payment Successful!</h3>
            <p className="text-green-50 text-sm">Confirmation email sent to {user?.email || 'your registered email'}</p>
          </div>
        </div>

        {/* --- INVOICE CONTAINER (Print Target) --- */}
        <div className="print-container bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-10">
          
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 {/* Replaced Icon with text for cleaner print, or ensure icon font loads */}
                 <span className="text-3xl font-black text-slate-900 tracking-tight uppercase">RentalEco</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Premium Asset Management</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-2">Invoice</h2>
              <p className="font-mono font-bold text-slate-900 text-lg">#{orderId}</p>
              <p className="text-slate-500 text-sm mt-1">
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Addresses Grid */}
          <div className="grid grid-cols-2 gap-12 mb-12 avoid-break">
            {/* From */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Billed From</p>
              <h4 className="font-bold text-slate-900 text-lg mb-1">RentalEco Pvt. Ltd.</h4>
              <div className="text-slate-600 text-sm space-y-1 leading-relaxed">
                <p>123 Innovation Drive, Tech Park</p>
                <p>Cyber City, Gurugram - 122003</p>
                <p>Haryana, India</p>
                <p className="pt-2"><span className="font-semibold text-slate-800">GSTIN:</span> 06AAAAA0000A1Z5</p>
                <p><span className="font-semibold text-slate-800">Email:</span> billing@rentaleco.com</p>
              </div>
            </div>

            {/* To */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Billed To</p>
              <h4 className="font-bold text-slate-900 text-lg mb-1">
                {user ? `${user.firstName} ${user.lastName}` : 'Guest Customer'}
              </h4>
              <div className="text-slate-600 text-sm space-y-1 leading-relaxed">
                <p>{address?.street || 'N/A'}</p>
                <p>{address?.city || ''}{address?.zip ? ` - ${address.zip}` : ''}</p>
                <p>{address?.country || ''}</p>
                {user?.email && <p className="pt-2"><span className="font-semibold text-slate-800">Email:</span> {user.email}</p>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-3 pl-2 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Item Description</th>
                  <th className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Period</th>
                  <th className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</th>
                  <th className="py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Rate</th>
                  <th className="py-3 pr-2 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orderItems.map((item, idx) => (
                  <tr key={idx} className="avoid-break">
                    <td className="py-4 pl-2 align-top">
                      <p className="font-bold text-slate-900 text-sm">{item.product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.product.category} • {item.product.brand}</p>
                    </td>
                    <td className="py-4 text-center text-sm text-slate-600 capitalize align-top">
                      {item.period}s<br/>
                      <span className="text-[10px] text-slate-400">
                         {new Date(item.startDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 text-center text-sm text-slate-900 font-bold align-top">{item.quantity}</td>
                    <td className="py-4 text-right text-sm text-slate-600 align-top">
                      ₹{(item.totalPrice / item.quantity).toLocaleString()}
                    </td>
                    <td className="py-4 pr-2 text-right text-sm text-slate-900 font-bold align-top">
                      ₹{item.totalPrice.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-12 avoid-break">
            <div className="w-full sm:w-1/2 lg:w-1/3 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span className="font-medium">Subtotal</span>
                <span className="text-slate-900">₹{subTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span className="font-medium">GST (18%)</span>
                <span className="text-slate-900">₹{gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span className="font-medium">Delivery Charges</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t-2 border-slate-900 pt-3 mt-3 flex justify-between items-center">
                <span className="font-bold text-slate-900 text-base">Total Amount</span>
                <span className="font-black text-slate-900 text-xl">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-slate-200 pt-8 mt-auto avoid-break">
            <div className="grid grid-cols-2 gap-8 text-xs text-slate-500">
              <div>
                <h5 className="font-bold text-slate-900 uppercase mb-2">Terms & Conditions</h5>
                <ul className="list-disc list-inside space-y-1">
                  <li>Goods once rented are non-transferable.</li>
                  <li>Late returns will attract a penalty of ₹500/day.</li>
                  <li>Damage to equipment will be charged as per actuals.</li>
                </ul>
              </div>
              <div className="text-right">
                <h5 className="font-bold text-slate-900 uppercase mb-2">Authorized Signatory</h5>
                <div className="h-12"></div> {/* Space for signature */}
                <p className="font-medium">RentalEco Pvt. Ltd.</p>
              </div>
            </div>
            
            <div className="text-center mt-12 pt-4 border-t border-slate-100">
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                Thank you for your business
              </p>
              <p className="text-slate-400 text-[10px] mt-1">
                For support, contact help@rentaleco.com or +91 1800-123-4567
              </p>
            </div>
          </div>

        </div>
        {/* --- END INVOICE CONTAINER --- */}

        {/* Web-Only Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
          <Link 
            to="/products" 
            className="flex-1 px-8 py-4 bg-white border-2 border-slate-300 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-center"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/profile" 
            className="flex-1 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all text-center"
          >
            View My Orders
          </Link>
        </div>
      </div>
      
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default OrderConfirmationPage;