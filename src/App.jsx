import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getCharacters, getAllCharacters } from './services/api';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import CharacterModal from './components/CharacterModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Login from './components/Login';

/**
 * Main App Content (requires authentication)
 */
function AppContent() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ homeworld: '', species: '', film: '' });
  const [allCharacters, setAllCharacters] = useState([]);

  // Load characters on mount and page change
  useEffect(() => {
    loadCharacters();
  }, [currentPage]);

  // Load all characters for filters
  useEffect(() => {
    loadAllCharacters();
  }, []);

  // Apply search and filters
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchQuery, filters, characters, allCharacters]);

  async function loadCharacters() {
    setLoading(true);
    setError(null);
    try {
      const data = await getCharacters(currentPage);
      setCharacters(data.results || []);
      // Calculate total pages (SWAPI returns ~10 results per page)
      const total = Math.ceil((data.count || 0) / 10);
      setTotalPages(total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadAllCharacters() {
    try {
      const all = await getAllCharacters();
      setAllCharacters(all);
    } catch (err) {
      console.error('Error loading all characters for filters:', err);
    }
  }

  function applyFiltersAndSearch() {
    // If filters or search are active, use allCharacters, otherwise use current page characters
    const hasActiveFilters = Object.values(filters).some(f => f);
    const hasSearch = searchQuery.trim().length > 0;
    const sourceData = (hasActiveFilters || hasSearch) && allCharacters.length > 0
      ? allCharacters
      : characters;

    let filtered = [...sourceData];

    // Apply search
    if (hasSearch) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.homeworld) {
      filtered = filtered.filter(char =>
        char.homeworld === filters.homeworld
      );
    }

    if (filters.species) {
      filtered = filtered.filter(char =>
        char.species && char.species.includes(filters.species)
      );
    }

    if (filters.film) {
      filtered = filtered.filter(char =>
        char.films && char.films.includes(filters.film)
      );
    }

    setFilteredCharacters(filtered);
  }

  function handleCharacterClick(character) {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <div className="mb-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search characters by name..."
          />
          <FilterBar
            onFilterChange={handleFilterChange}
            allCharacters={allCharacters}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        {error ? (
          <ErrorMessage message={error} onRetry={loadCharacters} />
        ) : (
          <>
            <CharacterList
              characters={filteredCharacters}
              onCharacterClick={handleCharacterClick}
              loading={loading}
            />
            {!loading && !searchQuery && Object.values(filters).every(f => !f) && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        <CharacterModal
          character={selectedCharacter}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </main>
    </div>
  );
}

/**
 * Main App Component
 */
function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <AppContent />;
}

/**
 * App with Auth Provider
 */
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
