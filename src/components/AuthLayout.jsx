import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const backgroundVariants = {
  initial: { backgroundPosition: '0% 0%' },
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export const AuthLayout = ({ children, title, isLoading }) => {
  return (
    <motion.div
      variants={backgroundVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 bg-[length:400%_400%] p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 120,
          damping: 20,
        }}
        className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)] hover:shadow-[0_0_80px_rgba(0,0,0,0.15)] transition-shadow duration-500"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute -top-1 -left-1 w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg -z-10 blur-lg opacity-50"
          />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin text-gray-700" />
                <span className="text-gray-700 font-medium">Processing...</span>
              </motion.div>
            )}
          </div>
        </motion.div>
        {children}
      </motion.div>
    </motion.div>
  );
};