import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="bg-white rounded-xl border border-gray-100   overflow-hidden"
    >
      <div className="w-full h-40 bg-gray-100 animate-pulse" />
      <div className="p-3">
        <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded mx-auto" />
      </div>
    </motion.div>
  );
}
