import { motion } from 'framer-motion';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-xs font-medium text-red-600 mb-2">Error</p>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-4 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}
          >
            Retry
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
