/**
 * Get background color based on species
 */
export function getSpeciesColor(speciesUrl) {
  // Map species to colors
  const speciesColors = {
    'human': '#3b82f640',
    'droid': '#6b728040',
    'wookiee': '#d9770640',
    'rodian': '#22c55e40',
    'hutt': '#eab30840',
    'yoda\'s species': '#05966940',
    'toydarian': '#9333ea40',
    'mon calamari': '#06b6d440',
    'ewok': '#f9731640',
    'sullustan': '#ec489940',
  };
  
  // Extract species name from URL (simplified - in real app would fetch species)
  // For now, return a default color or random based on URL hash
  const defaultColor = '#6366f140';
  
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


