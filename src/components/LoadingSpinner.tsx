import React from 'react';
import { Film } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
        
        {/* Middle rotating ring */}
        <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-blue-500 border-l-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full animate-pulse backdrop-blur-sm border border-purple-500/30"></div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="h-6 w-6 text-purple-400 animate-pulse" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="absolute mt-32">
        <p className="text-gray-400 text-sm font-medium animate-pulse">Loading cinematic experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;