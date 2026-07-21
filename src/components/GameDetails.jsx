import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/rawgApi";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGameDetails(id)
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
          ← Back to games
        </Link>

        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        <h1 className="text-3xl font-bold text-white mb-4">{game.name}</h1>

        <p className="text-gray-400 mb-2">⭐ Rating: {game.rating} / 5</p>
        <p className="text-gray-400 mb-6">📅 Released: {game.released}</p>

        <div
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>
    </div>
  );
}

export default GameDetails;