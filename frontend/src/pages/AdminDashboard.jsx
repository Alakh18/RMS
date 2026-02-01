import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  
  // State for Profile Dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);

  // Stats State
  const stats = {
    total: users.length, 
    vendors: users.filter(u => u.role === 'VENDOR').length,
    customers: users.filter(u => u.role === 'CUSTOMER').length
  };

  const API_BASE = 'http://localhost:3000/api/admin';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch(`${API_BASE}/users?page=${page}&limit=6&search=${search}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 403) {
        alert("Access Denied: Admins Only");
        navigate('/');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  // Handle Delete User
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers(); // Refresh list
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  // Handle Role Change
  const handleRoleUpdate = async (userId, newRole) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole })
      });

      if (res.ok) {
        fetchUsers(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data if you store it
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
             </div>
             <span className="text-xl font-bold tracking-tight text-slate-900">RentalEco <span className="text-indigo-600 text-sm font-normal">Admin</span></span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">System Admin</div>
                <div className="text-xs text-slate-500">admin@rentaleco.com</div>
             </div>
             
             {/* Profile Dropdown */}
             <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  AD
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">Administrator</p>
                      <p className="text-xs text-slate-500 truncate">admin@rentaleco.com</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      My Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Logout
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      </nav>

      {/* 2. Main Content */}
      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Customers & Vendors</h1>
            <p className="text-slate-500">Manage system access, roles, and user accounts.</p>
          </div>
          
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm text-center min-w-[100px]">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Users</div>
                <div className="text-xl font-bold text-indigo-600">{users.length > 0 ? `${(page-1)*6 + users.length}+` : 0}</div>
             </div>
             <button 
                onClick={() => navigate('/signup')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20"
             >
                <span className="material-symbols-outlined">add</span>
                Add User
             </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-xl mb-8 flex flex-col md:flex-row gap-2 border border-slate-200 shadow-sm">
           <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-lg border border-transparent focus-within:border-indigo-500/50 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-slate-400 mr-3">search</span>
              <input 
                 type="text" 
                 placeholder="Search customers by name or email..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-transparent border-none p-0 text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-0 w-full outline-none"
              />
           </div>
           <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
              >
                <span className="material-symbols-outlined">view_list</span>
              </button>
           </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading users...</div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all group relative">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 border border-slate-200">
                      {user.firstName[0]}
                   </div>
                   <div className="relative">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        className={`appearance-none pl-3 pr-8 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                           user.role === 'ADMIN' ? 'text-purple-700 border-purple-200 bg-purple-50' :
                           user.role === 'VENDOR' ? 'text-blue-700 border-blue-200 bg-blue-50' :
                           'text-emerald-700 border-emerald-200 bg-emerald-50'
                        }`}
                      >
                        <option value="CUSTOMER" className="bg-white text-slate-700">Customer</option>
                        <option value="VENDOR" className="bg-white text-slate-700">Vendor</option>
                        <option value="ADMIN" className="bg-white text-slate-700">Admin</option>
                      </select>
                   </div>
                </div>

                {/* User Info */}
                <h3 className="text-lg font-bold text-slate-900 mb-1">{user.firstName} {user.lastName}</h3>
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">mail</span>
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">call</span>
                    <span>{user.phoneNumber || "+91 XXXXX XXXXX"}</span> 
                  </div>
                  {user.companyName && (
                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                      <span className="material-symbols-outlined text-[16px]">business</span>
                      <span>{user.companyName}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                   <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">View Details</button>
                   <button 
                      onClick={() => handleDelete(user.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete User"
                   >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
             <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                   <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Company</th>
                      <th className="p-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                  {user.firstName[0]}
                               </div>
                               <div>
                                  <div className="font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                                  <div className="text-xs text-slate-500">{user.email}</div>
                               </div>
                            </div>
                         </td>
                         <td className="p-4">
                            <select 
                                value={user.role}
                                onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="VENDOR">Vendor</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                         </td>
                         <td className="p-4">{user.companyName || "—"}</td>
                         <td className="p-4 text-right">
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors"
                            >
                               <span className="material-symbols-outlined">delete</span>
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
           <button 
             disabled={page === 1}
             onClick={() => setPage(p => Math.max(1, p - 1))}
             className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 shadow-sm transition-all"
           >
             Previous
           </button>
           <span className="px-4 py-2 text-slate-500 flex items-center font-medium">Page {page} of {totalPages}</span>
           <button 
             disabled={page >= totalPages}
             onClick={() => setPage(p => p + 1)}
             className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
           >
             Next
           </button>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;