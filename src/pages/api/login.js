// pages/api/login.js

import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req, res) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;
  const scopes = 'user-read-private user-read-email'; // Define required scopes here
  const state = 'some_state'; // Optionally, you can use state parameter for CSRF protection

  // Redirect user to Spotify authorization page
  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: state
  });

  const authorizeUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
  res.redirect(authorizeUrl);
}
