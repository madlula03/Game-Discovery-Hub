import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { isInWishlist, toggleWishlist } from "../services/wishlist";

function GameCard({ game, onWishlistChange }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(game.id));
  }, [game.id]);

  function handleWishlistClick() {
    const { wasAdded } = toggleWishlist(game);
    setWishlisted(wasAdded);

    if (wasAdded) {
      toast.success(`${game.name} added to wishlist ❤️`);
    } else {
      toast(`${game.name} removed from wishlist`, { icon: "💔" });
    }

    if (onWishlistChange) {
      onWishlistChange(game.id, wasAdded);
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200 relative">
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 text-2xl transition-transform duration-200 hover:scale-125 active:scale-90"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>

      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2 truncate">
          {game.name}
        </h3>
        <p className="text-gray-400 text-sm">⭐ Rating: {game.rating} / 5</p>
        <p className="text-gray-400 text-sm mb-4">📅 Released: {game.released}</p>
        <Link
          to={`/game/${game.id}`}
          className="inline-block text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default GameCard;