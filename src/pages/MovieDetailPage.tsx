import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Download, HardDrive, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies } = useApp();
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative">
        {/* Backdrop Image with Overlay */}
        <div className="absolute inset-0 h-[600px]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover opacity-20 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Movies</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10 transform hover:scale-105 transition-transform duration-500">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Rating */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-8 text-gray-300">
                  <div className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-xl font-bold text-white">{movie.rating}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <span className="font-medium">{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">{movie.duration}</span>
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3">
                {movie.genre.map((genre) => (
                  <span
                    key={genre}
                    className="bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/20 backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                  <span>Overview</span>
                  <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.description}
                </p>
              </div>

              {/* Download Info */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Download Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <HardDrive className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">File Size</div>
                      <div className="font-bold text-white">{movie.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Monitor className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Quality</div>
                      <div className="font-bold text-white">{movie.quality}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Star className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Rating</div>
                      <div className="font-bold text-white">{movie.rating}/10</div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => window.open(movie.downloadLink, '_blank')}
                  className="group relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center justify-center space-x-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  <Download className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="text-xl">Download Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;