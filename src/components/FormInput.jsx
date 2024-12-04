import { motion } from 'framer-motion';

export const FormInput = ({ label, id, error, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <motion.label
        whileHover={{ scale: 1.01 }}
        htmlFor={id}
        className="block text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent"
      >
        {label}
      </motion.label>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative"
      >
        <input
          id={id}
          {...props}
          className={`block w-full px-4 py-3 rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg blur-sm"
        />
      </motion.div>
      {error && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-sm text-red-500 font-medium"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};