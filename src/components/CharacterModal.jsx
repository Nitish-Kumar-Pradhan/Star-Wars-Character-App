import { useState, useEffect } from "react";
import { getCharacterDetails, getHomeworld } from "../services/api";
import { formatDate } from "../utils/colors";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonModal from "./SkeletonModal";

export default function CharacterModal({ character, isOpen, onClose }) {
  const [details, setDetails] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && character) {
      loadCharacterDetails();
    }
  }, [isOpen, character]);

  async function loadCharacterDetails() {
    setLoading(true);
    setError(null);
    try {
      const charDetails = character.url
        ? await getCharacterDetails(character.url)
        : character;
      setDetails(charDetails);
      if (charDetails.homeworld) {
        const homeworldData = await getHomeworld(charDetails.homeworld);
        setHomeworld(homeworldData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  const imageUrl = `https://picsum.photos/seed/${
    character?.name || "Unknown"
  }/600/400`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden  "
          onClick={(e) => e.stopPropagation()}
        >
          {loading ? (
            <div className="p-4 sm:p-6">
              <SkeletonModal />
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                <motion.img
                  src={imageUrl}
                  alt={details?.name || character.name}
                  className="w-full h-48 sm:h-56 object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5   hover:bg-white transition-all"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center tracking-tight" style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
                }}>
                  {details?.name || character.name}
                </h2>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-1">Height</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {details?.height !== "unknown"
                        ? `${details?.height} cm`
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-1">Mass</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {details?.mass !== "unknown"
                        ? `${details?.mass} kg`
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-1">Birth Year</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {details?.birth_year || "Unknown"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500 mb-1">Films</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {details?.films?.length || 0}{" "}
                      {details?.films?.length === 1 ? "film" : "films"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                  <p className="text-xs text-gray-500 mb-1">Date Added</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatDate(details?.created || character.created)}
                  </p>
                </div>

                {homeworld && (
                  <motion.div
                    className="bg-blue-50 rounded-lg p-3 border border-blue-100"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-sm font-semibold text-gray-900 mb-2.5" style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
                    }}>
                      Homeworld
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Name</p>
                        <p className="text-xs font-medium text-gray-900">
                          {homeworld.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Terrain</p>
                        <p className="text-xs font-medium text-gray-900">
                          {homeworld.terrain}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Climate</p>
                        <p className="text-xs font-medium text-gray-900">
                          {homeworld.climate}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Population</p>
                        <p className="text-xs font-medium text-gray-900">
                          {homeworld.population !== "unknown"
                            ? parseInt(homeworld.population).toLocaleString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
