import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Calendar, Film, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdminLogin from '../components/AdminLogin';
import MovieForm from '../components/MovieForm';
import { Movie } from '../types/Movie';

const AdminPage: React.FC = () => {
  const { user, movies, deleteMovie } = useApp();
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!user) {
    return <AdminLogin />;
  }

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowMovieForm(true);
  };

  const handleDelete = (movieId: string) => {
    deleteMovie(movieId);
    setDeleteConfirm(null);
  };

  const closeForm = () => {
    setShowMovieForm(false);
    setEditingMovie(undefined);
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Assuming formData.genre is a string like "romance, action"
  const genreArray = formData.genre
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const movieToSend = {
    ...formData,
    genre: genreArray,
    year: Number(formData.year),
  };

  // Now send movieToSend instead of formData
  addMovie(movieToSend);  // or updateMovie if editing
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 flex items-center space-x-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Admin</span>
              <span>Panel</span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your cinematic collection</p>
          </div>
          <button
           onClick={() => {
    setEditingMovie(undefined);
    setShowMovieForm(true);
  }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-105 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center space-x-3 overflow-hidden"
          >
            <div className="absolute inset-0 shimmer" />
            <Plus className="h-6 w-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative z-10">Add Movie</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Film className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-5xl font-black text-white group-hover:text-purple-400 transition-colors">{movies.length}</div>
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Total Movies</div>
          </div>
          
          <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-5xl font-black text-white group-hover:text-yellow-400 transition-colors">
                {(movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)}
              </div>
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Average Rating</div>
          </div>
          
          <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-5xl font-black text-white group-hover:text-blue-400 transition-colors">
                {new Set(movies.flatMap(movie => movie.genre)).size}
              </div>
            </div>
            <div className="text-gray-400 font-medium uppercase tracking-wider">Total Genres</div>
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Movie</th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Rating</th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Year</th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">Genres</th>
                  <th className="px-8 py-5 text-right text-sm font-bold text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movies.map((movie) => (
                  <tr key={movie._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg group-hover:text-purple-400 transition-colors">{movie.title}</div>
                          <div className="text-gray-500 text-sm">{movie.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1.5 w-fit">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{movie.rating}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <span className="font-medium">{movie.year || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                       {Array.isArray(movie.genre) && movie.genre.length > 0 ? (
  <>
    {movie.genre.slice(0, 2).map((genre) => (
      <span key={genre} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">
        {genre}
      </span>
    ))}
    {movie.genre.length > 2 && (
      <span className="text-gray-500 text-xs font-medium">
        +{movie.genre.length - 2} more
      </span>
    )}
  </>
) : (
  <span className="text-gray-600 text-xs italic">No genres</span>
)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-500/30"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(movie._id)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Movie Form Modal */}
      {showMovieForm && (
        <MovieForm movie={editingMovie} onClose={closeForm} />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl shadow-red-500/20">
            <h3 className="text-2xl font-black text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Are you sure you want to delete this movie? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;