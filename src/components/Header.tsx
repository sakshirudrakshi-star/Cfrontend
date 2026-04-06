import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, User, Search, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { user, logout, searchQuery, setSearchQuery } = useApp();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Film className="h-9 w-9 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="absolute inset-0 bg-purple-500/20 blur-xl group-hover:bg-purple-400/30 transition-all" />
            </div>
            <span className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors tracking-tight">
              CINEHUB
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {isHomePage && (
              <div className="relative group">
                <Search className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-200 w-72 backdrop-blur-sm"
                />
              </div>
            )}

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/25"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all duration-300"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;