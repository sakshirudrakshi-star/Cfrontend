import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(username, password);
    
    if (!success) {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/10">
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Admin</span> Login
            </h2>
            <p className="text-gray-400">Sign in to manage your cinematic collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-500 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">{isLoading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Demo credentials: <span className="text-purple-400 font-bold">admin</span> / <span className="text-purple-400 font-bold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;