const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function getGames() {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export async function searchGames(query) {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&search=${query}`
  );

  if (!response.ok) {
    throw new Error(`Failed to search games: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export async function getGameDetails(id) {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch game details: ${response.status}`);
  }

  const data = await response.json();
  return data;
}