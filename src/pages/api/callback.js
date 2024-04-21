// pages/api/callback.js
import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    // **Validate state parameter for CSRF protection (optional)**
    // if (state !== 'some_state') { // Replace 'some_state' with your actual state value
    //   console.error('Invalid state parameter');
    //   res.status(400).json({ error: 'Invalid state' });
    //   return;
    // }

    // Construct request body with URL-encoded data (recommended by Spotify)
    const data = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    // Send POST request with URL-encoded data
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;

    // Redirect the user to the home page or another relevant page
    res.redirect(`/taste/page`);
  } catch (error) {
    console.error('Error handling callback:', error);
    res.status(500).json({ error: 'Failed to handle callback' });
  }
}
