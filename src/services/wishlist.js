const WISHLIST_KEY = "wishlist";

// Get the full wishlist array from localStorage
export function getWishlist() {
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Check if a specific game is already in the wishlist
export function isInWishlist(gameId) {
  const wishlist = getWishlist();
  return wishlist.some((game) => game.id === gameId);
}

// Add a game to the wishlist
export function addToWishlist(game) {
  const wishlist = getWishlist();
  const updated = [...wishlist, game];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  return updated;
}

// Remove a game from the wishlist by id
export function removeFromWishlist(gameId) {
  const wishlist = getWishlist();
  const updated = wishlist.filter((game) => game.id !== gameId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  return updated;
}

// Toggle: if it's in the wishlist, remove it; if not, add it
// Returns { updated, wasAdded } so the caller knows what just happened
export function toggleWishlist(game) {
  if (isInWishlist(game.id)) {
    const updated = removeFromWishlist(game.id);
    return { updated, wasAdded: false };
  } else {
    const updated = addToWishlist(game);
    return { updated, wasAdded: true };
  }
}