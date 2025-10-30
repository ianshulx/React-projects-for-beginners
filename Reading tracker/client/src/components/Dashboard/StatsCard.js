import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-400/20 to-blue-600/20',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: 'text-white',
      border: 'border-blue-200/50',
      accent: 'text-blue-600'
    },
    green: {
      bg: 'from-green-400/20 to-green-600/20',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      icon: 'text-white',
      border: 'border-green-200/50',
      accent: 'text-green-600'
    },
    yellow: {
      bg: 'from-yellow-400/20 to-yellow-600/20',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      icon: 'text-white',
      border: 'border-yellow-200/50',
      accent: 'text-yellow-600'
    },
    purple: {
      bg: 'from-purple-400/20 to-purple-600/20',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      icon: 'text-white',
      border: 'border-purple-200/50',
      accent: 'text-purple-600'
    },
    red: {
      bg: 'from-red-400/20 to-red-600/20',
      iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
      icon: 'text-white',
      border: 'border-red-200/50',
      accent: 'text-red-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div 
      className={`card-gradient p-6 card-hover relative overflow-hidden group`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <motion.p 
            className="text-sm font-semibold text-gray-600 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.p>
          <motion.p 
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div 
          className={`p-4 rounded-2xl ${colors.iconBg} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className={`w-8 h-8 ${colors.icon}`} />
        </motion.div>
      </div>
      
      {/* Floating decoration */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full blur-sm group-hover:scale-150 transition-transform duration-500"></div>
    </motion.div>
  );
};

export default StatsCard;
