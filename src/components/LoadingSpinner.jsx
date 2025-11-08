import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-gray-200 border-t-gray-900 rounded-full"
      />
    </div>
  );
}
