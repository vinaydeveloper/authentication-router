import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Bell, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
  };

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
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center"
            >
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-3"
              >
                <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
                <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-6 sm:px-0"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white overflow-hidden shadow-xl rounded-lg"
          >
            <div className="p-6">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Welcome back, {user.username}!
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-600"
              >
                This is your protected dashboard area. You can access this content because you're authenticated.
              </motion.p>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Card {item}
                  </h3>
                  <p className="text-gray-600">
                    This is a sample card with some content. You can customize this based on your needs.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;