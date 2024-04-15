
import styles from './page.module.css';
const MusicTaste = ({ rating }) => {
  return (
    <div className="music-taste-container">
      <h1 className="title">Your Music Taste</h1>
      <div className="rating-display">
        <span className="rating-number">{rating}</span>
        <span className="rating-label">Out of 10</span>
      </div>
      <p className="description">
        Based on your Spotify data, your music taste scores a {rating} out of 10! This rating considers the diversity of genres and artists you listen to.
      </p>
      {/* Add sections for favorite genres/artists (optional) */}
      <div className="additional-info">
        {/* Add content based on user data (e.g., top genres, artists) */}
      </div>
    </div>
  );
};

export default MusicTaste;
