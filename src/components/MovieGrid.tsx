import React, { useMemo } from 'react';
import { Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import MovieCard from './MovieCard';

const MovieGrid: React.FC = () => {
  const { movies, searchQuery, selectedGenre } = useApp();

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === '' || movie.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, selectedGenre]);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      movie.genre.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [movies]);

  const { setSelectedGenre } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as any }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Genre Filter */}
      <div className="mb-12">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"
        >
          <span>Browse by Genre</span>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          <motion.button
            key="all-genres"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedGenre('')}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${selectedGenre === ''
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm'
              }`}
          >
            All Genres
          </motion.button>

          {allGenres.map((genre) => (
            <motion.button
              key={genre}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${selectedGenre === genre
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm'
                }`}
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Movies Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredMovies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6 drop-shadow-2xl">
            <Film className="h-10 w-10 text-gray-600" />
          </div>
          <div className="text-gray-400 text-xl mb-2">No movies found</div>
          <div className="text-gray-600">Try adjusting your search or filter criteria</div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieGrid;
