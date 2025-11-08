import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CustomDropdown from './CustomDropdown';

export default function FilterBar({ onFilterChange, allCharacters = [] }) {
  const [filters, setFilters] = useState({
    homeworld: '',
    species: '',
    film: '',
  });
  
  const [uniqueHomeworlds, setUniqueHomeworlds] = useState([]);
  const [uniqueSpecies, setUniqueSpecies] = useState([]);
  const [uniqueFilms, setUniqueFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFilterOptions();
  }, [allCharacters]);

  async function loadFilterOptions() {
    if (allCharacters.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const homeworlds = new Set();
      const species = new Set();
      const films = new Set();
      
      allCharacters.forEach(char => {
        if (char.homeworld) homeworlds.add(char.homeworld);
        if (char.species && char.species.length > 0) {
          char.species.forEach(s => species.add(s));
        }
        if (char.films && char.films.length > 0) {
          char.films.forEach(f => films.add(f));
        }
      });
      
      const homeworldPromises = Array.from(homeworlds).map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return { url, name: data.name };
        } catch {
          return { url, name: url.split('/').slice(-2, -1)[0] };
        }
      });
      
      const speciesPromises = Array.from(species).map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return { url, name: data.name };
        } catch {
          return { url, name: url.split('/').slice(-2, -1)[0] };
        }
      });
      
      const filmPromises = Array.from(films).map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return { url, name: data.title || `Film ${url.split('/').slice(-2, -1)[0]}` };
        } catch {
          return { url, name: `Film ${url.split('/').slice(-2, -1)[0]}` };
        }
      });
      
      const [homeworldData, speciesData, filmData] = await Promise.all([
        Promise.all(homeworldPromises),
        Promise.all(speciesPromises),
        Promise.all(filmPromises),
      ]);
      
      setUniqueHomeworlds(homeworldData.sort((a, b) => a.name.localeCompare(b.name)));
      setUniqueSpecies(speciesData.sort((a, b) => a.name.localeCompare(b.name)));
      setUniqueFilms(filmData.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error('Error loading filter options:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(key, value) {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }

  function clearFilters() {
    const clearedFilters = { homeworld: '', species: '', film: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  }

  const hasActiveFilters = Object.values(filters).some(f => f);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-3 flex gap-2"
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 h-16 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[140px]">
          <CustomDropdown
            label="Homeworld"
            value={filters.homeworld}
            options={uniqueHomeworlds.map(hw => ({ value: hw.url, label: hw.name }))}
            onChange={(value) => handleFilterChange('homeworld', value)}
            placeholder="All Homeworlds"
          />
        </div>
        
        <div className="flex-1 min-w-[140px]">
          <CustomDropdown
            label="Species"
            value={filters.species}
            options={uniqueSpecies.map(s => ({ value: s.url, label: s.name }))}
            onChange={(value) => handleFilterChange('species', value)}
            placeholder="All Species"
          />
        </div>
        
        <div className="flex-1 min-w-[140px]">
          <CustomDropdown
            label="Film"
            value={filters.film}
            options={uniqueFilms.map(f => ({ value: f.url, label: f.name }))}
            onChange={(value) => handleFilterChange('film', value)}
            placeholder="All Films"
          />
        </div>
        
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}
          >
            Clear
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
