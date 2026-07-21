import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
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