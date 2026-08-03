import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Grid, LogOut, Users, FileText, Lock, Eye, EyeOff, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "ThinhPhongDo@2024";
    if (password === correctPassword) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mật khẩu quản trị viên không chính xác!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Danh mục', path: '/admin/categories', icon: Grid },
    { name: 'Sản phẩm', path: '/admin/products', icon: Package },
    { name: 'Khách hàng', path: '/admin/contacts', icon: Users },
    { name: 'Tài liệu', path: '/admin/documents', icon: FileText },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-red-800/10 blur-[120px]" />

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20 shadow-inner animate-pulse">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Hệ Thống Quản Trị</h2>
            <p className="text-slate-400 text-sm mt-2">Vui lòng nhập mật khẩu quản trị để tiếp tục</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="password">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs font-semibold mt-2.5 bg-red-500/10 px-3.5 py-2 border border-red-500/20 rounded-lg">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:shadow-red-600/20 tracking-wider hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
            >
              ĐĂNG NHẬP
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              ← Về Trang Chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static inset-y-0 left-0 z-50 bg-white shadow-md flex flex-col transform transition-all duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isCollapsed ? 'md:w-20' : 'md:w-64 w-64'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          {!isCollapsed ? (
            <h1 className="text-xl font-bold text-red-600 transition-all duration-300">PTD Admin</h1>
          ) : (
            <h1 className="text-xl font-bold text-red-600 transition-all duration-300 mx-auto">PTD</h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    isCollapsed ? 'justify-center px-2' : ''
                  } ${
                    isActive 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                title={isCollapsed ? item.name : ''}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="transition-opacity duration-300">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 flex flex-col gap-2 shrink-0">
          <NavLink
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={isCollapsed ? "Về trang chủ" : ""}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span>Về trang chủ</span>}
          </NavLink>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={isCollapsed ? "Đăng xuất" : ""}
          >
            <LogOut size={20} className="rotate-180 animate-pulse shrink-0" />
            {!isCollapsed && <span>Đăng xuất</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 shrink-0 border-b">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (window.innerWidth >= 768) {
                  setIsCollapsed(!isCollapsed);
                } else {
                  setIsSidebarOpen(true);
                }
              }}
              className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Quản trị hệ thống</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold border border-red-200">Admin Session</span>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
