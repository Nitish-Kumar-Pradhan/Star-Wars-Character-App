import { motion } from "framer-motion";
import CharacterCard from './CharacterCard';
import SkeletonCard from './SkeletonCard';

export default function CharacterList({ characters, onCharacterClick, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {[...Array(10)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-sm text-gray-400 font-medium" style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
        }}>
          No characters found
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {characters.map((character, index) => (
        <motion.div
          key={character.url || character.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03, type: "spring", stiffness: 400, damping: 30 }}
        >
          <CharacterCard
            character={character}
            onClick={onCharacterClick}
          />
        </motion.div>
      ))}
    </div>
  );
}
