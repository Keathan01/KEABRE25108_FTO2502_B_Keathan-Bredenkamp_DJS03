import React from "react";
import { formatDistanceToNow } from "date-fns";

/**
 * @param {Object} props
 * @param {string} props.image
 * @param {string} props.title
 * @param {number} props.seasons
 * @param {Array<string>} props.genres
 * @param {string} props.updated
 */
function PodcastPreviewCard({ image, title, seasons, genres, updated }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>Seasons: {seasons}</p>
      <div className="genre-tags">
        {genres.map((genre, index) => (
          <span key={index} className="genre-tag">
            {genre}
          </span>
        ))}
      </div>
      <p className="updated">
        Updated {formatDistanceToNow(new Date(updated))} ago
      </p>
    </div>
  );
}

export default PodcastPreviewCard;
