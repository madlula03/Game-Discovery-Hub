import { useState, useEffect } from "react";
import { Routes, Route, Link} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getGames, searchGames } from "./services/rawgApi";
import GameCard from "./components/GameCard";
import SearchBar from "./components/SearchBar";
import GameDetails from "./components/GameDetails";
import Wishlist from "./components/Wishlist";
import SkeletonCard from "./components/SkeletonCard";
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
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
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
        <Route path="/wishlist" element={<Wishlist />} />

      </Routes>
    </>
  );
}
function HomePage({ games, loading, error, onSearch }) {
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white">
          🎮 Game Discovery Hub
        </h1>
        <Link
          to="/wishlist"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          ❤️ My Wishlist
        </Link>
      </div>

      <div className="flex justify-center mb-10">
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}

export default App;