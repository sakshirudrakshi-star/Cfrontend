import React from 'react';
import { Play, Film, Sparkles, Star, TrendingUp, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import MovieGrid from '../components/MovieGrid';

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-white/10 text-purple-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Premium Streaming Experience</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight"
            >
              Experience <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Cinematic
              </span> <br />
              Excellence
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl"
            >
              Immerse yourself in a world of premium entertainment. Watch the latest blockbusters in stunning <span className="text-white font-medium">4K resolution</span> anytime, anywhere.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-purple-600 rounded-2xl font-bold text-white overflow-hidden hover:scale-105 active:scale-95 transition-all card-shadow">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <Play className="h-5 w-5 fill-current" />
                  Explore Now
                </span>
              </button>

              <button className="px-8 py-4 glass text-white rounded-2xl font-bold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                <Info className="h-5 w-5" />
                Browse Library
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
        </motion.div>
      </section>

      {/* Featured Stats - Floating Cards */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'stat-movies', label: 'Movies', value: '1,200+', icon: Film, color: 'text-purple-400' },
            { id: 'stat-quality', label: 'Quality', value: '4K Ultra HD', icon: Star, color: 'text-blue-400' },
            { id: 'stat-uptime', label: 'Uptime', value: '99.9%', icon: TrendingUp, color: 'text-pink-400' }
          ].map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass p-8 rounded-3xl hover:border-purple-500/30 group transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Trending Movies</h2>
              <p className="text-slate-500">Curated specifically for your entertainment needs</p>
            </div>
            <button className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group">
              View All <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MovieGrid />
        </motion.div>
      </main>

      {/* Modern Footer Section */}
      <footer className="border-t border-white/5 py-12 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2024 MovieWeb Premium. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;