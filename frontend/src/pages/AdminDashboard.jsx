import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Fetch Users from Backend
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch(`http://localhost:3000/api/admin/users?page=${page}&limit=6&search=${search}`, {
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased selection:bg-primary/20 selection:text-primary flex flex-col">
      
      {/* 1. Glass Navbar (Consistent with Home.jsx) */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-glass">
          <div className="flex items-center gap-3">
             <div className="size-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-glow">
                <span className="material-symbols-outlined text-[20px]">hexagon</span>
             </div>
             <span className="text-lg font-bold tracking-tight text-[#0d131c]">RentalEco <span className="text-primary font-normal text-sm ml-1">Admin</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/60">
             {['Overview', 'Orders', 'Products', 'Customers', 'Reports'].map((item) => (
                <a key={item} href="#" className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${item === 'Customers' ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-500 hover:text-primary'}`}>
                  {item}
                </a>
             ))}
          </div>

          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs border border-white shadow-sm">
                AD
             </div>
          </div>
        </div>
      </nav>

      {/* 2. Main Content Area */}
      <main className="flex-grow pt-32 px-6 pb-12 max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#0d131c] tracking-tight mb-2">User Management</h1>
            <p className="text-slate-500 font-medium">Manage customer access and vendor roles.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add User
             </button>
          </div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className="glass-panel p-2 rounded-2xl mb-8 flex flex-col md:flex-row gap-2 shadow-sm">
           <div className="flex-1 flex items-center px-4 py-3 bg-white/50 rounded-xl hover:bg-white transition-colors group focus-within:bg-white border border-transparent focus-within:border-primary/20">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary mr-3">search</span>
              <input 
                 type="text" 
                 placeholder="Search by name or email..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-transparent border-none p-0 text-sm font-medium text-slate-900 placeholder-slate-400 focus:ring-0 w-full"
              />
           </div>
           
           <div className="flex items-center gap-2 p-1 bg-slate-100/50 rounded-xl border border-slate-200/60">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
           </div>
        </div>

        {/* 3. Content Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-primary/5 transition-colors"></div>
                
                <div className="flex items-start justify-between relative z-10">
                   <div className="size-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-lg">
                      {user.firstName[0]}
                   </div>
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      user.role === 'VENDOR' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                   }`}>
                      {user.role}
                   </span>
                </div>

                <div className="mt-4 relative z-10">
                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                      {user.firstName} {user.lastName}
                   </h3>
                   <p className="text-sm text-slate-500 mb-1 truncate">{user.email}</p>
                   {user.companyName && (
                     <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 mt-2">
                        <span className="material-symbols-outlined text-[14px]">business</span>
                        {user.companyName}
                     </div>
                   )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-xs font-medium text-slate-400">Joined Jan 2024</span>
                   <button className="text-xs font-bold text-primary hover:text-primary-dark hover:underline">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View (Table) */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200">
                   <tr>
                      <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider">User</th>
                      <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider">Role</th>
                      <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider">Company</th>
                      <th className="p-4 font-bold text-slate-700 uppercase text-xs tracking-wider text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                  {user.firstName[0]}
                               </div>
                               <div>
                                  <div className="font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                                  <div className="text-xs text-slate-400">{user.email}</div>
                               </div>
                            </div>
                         </td>
                         <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                               user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                               user.role === 'VENDOR' ? 'bg-blue-100 text-blue-700' :
                               'bg-slate-100 text-slate-600'
                            }`}>
                               {user.role}
                            </span>
                         </td>
                         <td className="p-4 font-medium">{user.companyName || "-"}</td>
                         <td className="p-4 text-right">
                            <button className="text-slate-400 hover:text-primary transition-colors">
                               <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {/* 4. Pagination (Bottom) */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
           <span className="text-sm font-medium text-slate-500">Page {page} of {totalPages}</span>
           <div className="flex gap-2">
               <button 
                 disabled={page === 1}
                 onClick={() => setPage(p => Math.max(1, p - 1))}
                 className="px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white hover:shadow-sm hover:border-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50"
               >
                 Previous
               </button>
               <button 
                 disabled={page >= totalPages}
                 onClick={() => setPage(p => p + 1)}
                 className="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
               >
                 Next
               </button>
            </div>
        </div>

      </main>

      {/* 5. Footer (Simple Version) */}
      <footer className="bg-white border-t border-slate-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2024 RentalEco Admin Portal. Restricted Access.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
             <a href="#" className="hover:text-primary">Support</a>
             <a href="#" className="hover:text-primary">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;