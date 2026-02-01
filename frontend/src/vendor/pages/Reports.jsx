import { useState, useEffect } from 'react';
import { fetchVendorReports } from '../services/vendorApi';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Reports = () => {
  const [dateRange, setDateRange] = useState({ 
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], // First day of current month
    end: new Date().toISOString().split('T')[0] // Today
  });

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Data
  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchVendorReports(dateRange.start, dateRange.end);
      if (response.success) {
        setReportData(response.data);
      }
    } catch {
      setError('Failed to load report data.');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on mount
  useEffect(() => {
    generateReport();
  }, []);

  // --- Export Functions ---

  const exportPDF = () => {
    if (!reportData?.exportData) return;

    const doc = new jsPDF();
    doc.text('Vendor Sales Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Period: ${dateRange.start} to ${dateRange.end}`, 14, 22);

    const tableColumn = ["Date", "Order ID", "Product", "Amount (INR)"];
    const tableRows = reportData.exportData.map(item => [
      format(new Date(item.date), 'yyyy-MM-dd'),
      item.orderId,
      item.productName,
      item.amount.toFixed(2)
    ]);

    doc.autoTable({
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      foot: [['', '', 'Total', reportData.summary.totalEarnings.toFixed(2)]],
    });

    doc.save(`report_${dateRange.start}_${dateRange.end}.pdf`);
  };

  const exportExcel = () => {
    if (!reportData?.exportData) return;

    const worksheet = XLSX.utils.json_to_sheet(reportData.exportData.map(item => ({
      Date: format(new Date(item.date), 'yyyy-MM-dd'),
      'Order ID': item.orderId,
      Product: item.productName,
      'Revenue': item.amount
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    saveAs(data, `report_${dateRange.start}_${dateRange.end}.xlsx`);
  };

  const exportCSV = () => {
    if (!reportData?.exportData) return;

    const worksheet = XLSX.utils.json_to_sheet(reportData.exportData);
    const csvBuffer = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csvBuffer], { type: 'text/csv;charset=utf-8' });
    
    saveAs(data, `report_${dateRange.start}_${dateRange.end}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Analyze business performance and earnings.</p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex gap-2">
           <button onClick={exportPDF} disabled={!reportData} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
             Export PDF
           </button>
           <button onClick={exportExcel} disabled={!reportData} className="bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
             Export Excel
           </button>
           <button onClick={exportCSV} disabled={!reportData} className="bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
             Export CSV
           </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter by Date</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg w-full md:w-auto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg w-full md:w-auto"
            />
          </div>
          <button 
            onClick={generateReport} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Reports Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{reportData?.summary?.totalEarnings?.toLocaleString() || '0'}
          </p>
          <p className="text-sm text-slate-500 mt-2">For selected period</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Rentals Completed</h3>
          <p className="text-3xl font-bold text-blue-600">
            {reportData?.summary?.totalRentals || '0'}
          </p>
          <p className="text-sm text-slate-500 mt-2">Across all products</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Avg Rental Duration</h3>
          <p className="text-3xl font-bold text-purple-600">
            {reportData?.summary?.avgDuration || '0'} days
          </p>
          <p className="text-sm text-slate-500 mt-2">Customer average</p>
        </div>
      </div>

      {/* Most Rented Products */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Products</h2>
        {reportData?.topProducts?.length > 0 ? (
          <div className="space-y-3">
            {reportData.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.rentals} rentals</p>
                </div>
                <p className="font-semibold text-slate-900">₹{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-4">No data available for this period.</p>
        )}
      </div>
    </div>
  );
};

export default Reports;