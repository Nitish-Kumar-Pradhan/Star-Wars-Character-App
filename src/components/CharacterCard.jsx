import { motion } from "framer-motion";
import { getSpeciesColor } from '../utils/colors';

export default function CharacterCard({ character, onClick }) {
  const speciesColor = getSpeciesColor(character.species?.[0] || "");
  const imageUrl = `https://picsum.photos/seed/${character.name}/400/300`;

  return (
    <motion.div
      onClick={() => onClick(character)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`rounded-xl border-2 cursor-pointer overflow-hidden transition-all duration-200`}
      style={{
        borderColor: speciesColor || '#e5e7eb50', // fallback to gray-200 if no species color
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={character.name}
          className="w-full h-40 object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5" 
           
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 text-center leading-tight tracking-tight" style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
        }}>
          {character.name}
        </h3>
      </div>
    </motion.div>
  );
}
