// pages/api/music-taste.js

import axios from 'axios';

export default async function handler(req, res) {
  const { access_token } = req.query;
  
  try {
    // Fetch user's saved tracks from Spotify API
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    // Analyze user's music preferences
    const tracks = response.data.items;
    const genres = tracks.map(track => track.track.album.genres).flat();
    const artists = tracks.map(track => track.track.artists[0].name);
    // Perform further analysis as needed...

    // Calculate music taste rating (placeholder)
    const rating = calculateRating(genres, artists); // Implement this function

    // Return the music taste rating
    res.status(200).json({ rating });
  } catch (error) {
    console.error('Error fetching music taste:', error);
    res.status(500).json({ error: 'Failed to fetch music taste' });
  }
}

function calculateRating(genres, artists) {
  // Implement your rating algorithm here
  // Example: Calculate rating based on genre diversity
  const uniqueGenres = new Set(genres);
  const genreDiversity = uniqueGenres.size;
  const rating = genreDiversity * 2; // Multiply by a factor for illustration
  return rating;
}
