import { motion } from "framer-motion";

export default function SkeletonModal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="w-full h-48 sm:h-56 bg-gray-100 animate-pulse rounded-lg mb-4" />

      <div className="space-y-3">
        <div className="h-6 w-2/3 bg-gray-100 animate-pulse rounded mx-auto" />
        
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-2.5">
              <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded mb-1.5" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-2.5">
          <div className="h-3 w-1/3 bg-gray-200 animate-pulse rounded mb-1.5" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
        </div>

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-2.5" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-1/2 bg-gray-200 animate-pulse rounded mb-1" />
                <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
