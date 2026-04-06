import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden transition-all duration-700 hover:scale-[1.08] hover:z-10 border border-white/5 hover:border-purple-500/50"
    >
      {/* Poster */}
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
          loading="lazy"
        />

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Glow Border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-xl" />
        </div>

        {/* Rating Badge with Enhanced Design */}
        <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-xl rounded-full px-3 py-2 flex items-center space-x-1.5 border border-yellow-500/40 shadow-2xl shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
          <Star className="h-4 w-4 text-yellow-400 fill-current animate-pulse" />
          <span className="text-white text-sm font-black">{movie.rating}</span>
        </div>

        {/* Enhanced Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-purple-500/30 blur-xl animate-pulse" />
            {/* Play button */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border-2 border-white/50 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-white border-b-[12px] border-b-transparent ml-1 drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="shimmer absolute inset-0" />
        </div>
      </div>

      {/* Content with Enhanced Styling */}
      <div className="p-6 space-y-4 relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="relative text-white font-black text-xl mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
          {movie.title}
        </h3>

        <div className="relative flex items-center justify-between text-gray-400 text-sm font-medium">
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Calendar className="h-3.5 w-3.5 text-purple-400" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Clock className="h-3.5 w-3.5 text-blue-400" />
            <span>{movie.duration}</span>
          </div>
        </div>

        <div className="relative flex flex-wrap gap-2">
          {movie.genre.slice(0, 2).map((genre, idx) => (
            <span
              key={`${genre}-${idx}`}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-500/30 backdrop-blur-sm group-hover:border-purple-500/50 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="relative text-gray-400 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {movie.description}
        </p>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
};

export default MovieCard;