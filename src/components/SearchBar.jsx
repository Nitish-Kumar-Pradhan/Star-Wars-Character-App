import { motion } from "framer-motion";

export default function SearchBar({ value, onChange, placeholder = "Search characters..." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 pl-9 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-all"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
          }}
        />
        <svg
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </motion.div>
  );
}
