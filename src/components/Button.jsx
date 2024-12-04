import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({ children, isLoading, icon: Icon, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
      className={`relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        ${props.className || 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950'}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 blur-md opacity-50 -z-10"
      />
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </div>
      )}
    </motion.button>
  );
};