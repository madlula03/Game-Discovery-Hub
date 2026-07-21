import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getGames, searchGames } from "./services/rawgApi";
import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGames()
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function handleSearch(query) {
    setLoading(true);
    searchGames(query)
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            games={games}
            loading={loading}
            error={error}
            onSearch={handleSearch}
          />
        }
      />
      <Route path="/game/:id" element={<GameDetails />} />
    </Routes>
  );
}

function HomePage({ games, loading, error, onSearch }) {
  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading games...</p>
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
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        🎮 Game Discovery Hub
      </h1>

      <div className="flex justify-center mb-10">
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default App;