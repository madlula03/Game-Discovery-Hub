import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import { getWishlist } from "../services/wishlist";

function WishlistPage() {
  const [wishlistGames, setWishlistGames] = useState([]);

  useEffect(() => {
    setWishlistGames(getWishlist());
  }, []);

  function handleWishlistChange(gameId, wasAdded) {
    if (!wasAdded) {
      setWishlistGames((prev) => prev.filter((game) => game.id !== gameId));
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">❤️ My Wishlist</h1>
        <Link
          to="/"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          ← Back to games
        </Link>
      </div>

      {wishlistGames.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          Your wishlist is empty. Go add some games! 🎮
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {wishlistGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onWishlistChange={handleWishlistChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;