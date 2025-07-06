import React, { useState, useEffect } from "react";
import PodcastPreviewCard from "./components/PodcastPreviewCard";
import { genres as genreData } from "./data";

/**
 * Maps genre IDs to human-readable titles.
 * @param {Array<number>} genreIds
 * @returns {Array<string>}
 */
function getGenreTitles(genreIds) {
  return genreIds.map((id) => {
    const genre = genreData.find((g) => g.id === id);
    return genre ? genre.title : "Unknown";
  });
}

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Discover Podcasts</h1>

      {loading && <p>Loading podcasts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && podcasts.length === 0 && <p>No podcasts found.</p>}

      <div className="grid">
        {podcasts.map((podcast) => (
          <PodcastPreviewCard
            key={podcast.id}
            image={podcast.image}
            title={podcast.title}
            seasons={podcast.seasons.length}
            genres={getGenreTitles(podcast.genres)}
            updated={podcast.updated}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
