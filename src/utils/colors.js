/**
 * Get background color based on species
 */
export function getSpeciesColor(speciesUrl) {
  // Map species to colors
  const speciesColors = {
    'human': 'bg-blue-100 border-blue-300',
    'droid': 'bg-gray-100 border-gray-300',
    'wookiee': 'bg-amber-100 border-amber-300',
    'rodian': 'bg-green-100 border-green-300',
    'hutt': 'bg-yellow-100 border-yellow-300',
    'yoda\'s species': 'bg-emerald-100 border-emerald-300',
    'toydarian': 'bg-purple-100 border-purple-300',
    'mon calamari': 'bg-cyan-100 border-cyan-300',
    'ewok': 'bg-orange-100 border-orange-300',
    'sullustan': 'bg-pink-100 border-pink-300',
  };
  
  // Extract species name from URL (simplified - in real app would fetch species)
  // For now, return a default color or random based on URL hash
  const defaultColor = 'bg-indigo-100 border-indigo-300';
  
  // Use a hash of the URL to get consistent colors
  if (!speciesUrl || speciesUrl.length === 0) {
    return defaultColor;
  }
  
  // Simple hash function for consistent color assignment
  const hash = speciesUrl.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const colors = Object.values(speciesColors);
  return colors[Math.abs(hash) % colors.length] || defaultColor;
}

/**
 * Format date as dd-MM-yyyy
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


