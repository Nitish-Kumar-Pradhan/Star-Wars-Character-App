const SWAPI_BASE_URL = 'https://swapi.dev/api';

/**
 * Fetch data from SWAPI
 */
async function fetchFromSWAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
}

/**
 * Get all characters with pagination
 */
export async function getCharacters(page = 1) {
  const url = `${SWAPI_BASE_URL}/people/?page=${page}`;
  return fetchFromSWAPI(url);
}

/**
 * Get character details by URL
 */
export async function getCharacterDetails(url) {
  return fetchFromSWAPI(url);
}

/**
 * Get homeworld details
 */
export async function getHomeworld(url) {
  return fetchFromSWAPI(url);
}

/**
 * Get all characters (all pages)
 */
export async function getAllCharacters() {
  let allCharacters = [];
  let nextUrl = `${SWAPI_BASE_URL}/people/`;
  
  while (nextUrl) {
    const data = await fetchFromSWAPI(nextUrl);
    allCharacters = allCharacters.concat(data.results);
    nextUrl = data.next;
  }
  
  return allCharacters;
}


