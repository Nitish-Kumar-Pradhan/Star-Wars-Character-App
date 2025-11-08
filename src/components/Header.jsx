import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight" style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
        }}>
          Star Wars Characters
        </h1>
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}>
              {user.username}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
              }}
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.header>
  );
}
