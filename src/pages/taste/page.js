
import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

function MusicTaste() {
  const [musicTasteData, setMusicTasteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/music-taste');

        if (!response.ok) {
          throw new Error('Failed to fetch music taste data');
        }

        const data = await response.json();
        setMusicTasteData(data);
      } catch (error) {
        console.error('Error fetching music taste:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles['music-taste-container']}>
      {isLoading && <p>Loading music taste...</p>}
      {error && <p>Error: {error}</p>}
      {musicTasteData && (
        <>
          <h1 className="title">Your Music Taste</h1>
          <div className="rating-display">
            <span className="rating-number">{musicTasteData.rating}</span>
            <span className="rating-label">Out of 10</span>
          </div>
          <p className="description">
            Based on your Spotify data, your music taste scores a {musicTasteData.rating} out of 10! This rating considers the diversity of genres and artists you listen to.
            {/* You can add details about genres and artists here based on the data structure */}
          </p>
          {musicTasteData.genres && (
            <p>
              Your top genres include: {musicTasteData.genres.slice(0, 3).join(', ')} (and more)
            </p>
          )}
          {musicTasteData.artists && (
            <p>
              Some of your favorite artists include: {musicTasteData.artists.slice(0, 3).join(', ')} (and more)
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default MusicTaste;
