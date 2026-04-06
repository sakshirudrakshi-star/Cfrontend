import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Movie } from '../types/Movie';
import { useApp } from '../context/AppContext';

interface MovieFormProps {
  movie?: Movie;
  onClose: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onClose }) => {
  const { addMovie, updateMovie } = useApp();
  const [formData, setFormData] = useState({
    title: movie?.title || '',
    rating: movie?.rating || 0,
    description: movie?.description || '',
    poster: movie?.poster || '',
    year: movie?.year || new Date().getFullYear(),
    genre: movie?.genre || [],
    duration: movie?.duration || '',
    downloadLink: movie?.downloadLink || '',
    size: movie?.size || '',
    quality: movie?.quality || '1080p'
  });
  const [newGenre, setNewGenre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const movieData: Movie = {
      id: movie?.id || Date.now().toString(),
      ...formData
    };

    if (movie) {
      updateMovie(movie.id, movieData);
    } else {
      addMovie(movieData);
    }

    setIsSubmitting(false);
    onClose();
  };

  const addGenre = () => {
    if (newGenre.trim() && !formData.genre.includes(newGenre.trim())) {
      setFormData(prev => ({
        ...prev,
        genre: [...prev.genre, newGenre.trim()]
      }));
      setNewGenre('');
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.filter(g => g !== genreToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-3xl font-black text-white">
            {movie ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Edit Movie</span>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Add New Movie</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Rating</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 148 min"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">File Size</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                placeholder="e.g., 2.1 GB"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Quality</label>
              <select
                value={formData.quality}
                onChange={(e) => setFormData(prev => ({ ...prev, quality: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
              >
                <option value="720p" className="bg-gray-900">720p HD</option>
                <option value="1080p" className="bg-gray-900">1080p Full HD</option>
                <option value="4K" className="bg-gray-900">4K Ultra HD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Poster URL</label>
            <input
              type="url"
              value={formData.poster}
              onChange={(e) => setFormData(prev => ({ ...prev, poster: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Download Link</label>
            <input
              type="url"
              value={formData.downloadLink}
              onChange={(e) => setFormData(prev => ({ ...prev, downloadLink: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Genres</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.genre.map((genre) => (
                <span
                  key={genre}
                  className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 border border-purple-500/30"
                >
                  <span>{genre}</span>
                  <button
                    type="button"
                    onClick={() => removeGenre(genre)}
                    className="text-purple-400 hover:text-purple-200 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Add genre"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
              />
              <button
                type="button"
                onClick={addGenre}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all duration-300 font-bold shadow-lg shadow-purple-500/30"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm resize-none"
              required
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
              <span className="relative z-10">{isSubmitting ? 'Saving...' : movie ? 'Update Movie' : 'Add Movie'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;