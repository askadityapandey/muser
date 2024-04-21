import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorizationUrl: "https://accounts.spotify.com/authorize",
      profileUrl: "https://api.spotify.com/v1/me",
      scopes: ["user-read-private"], // Adjust scopes as needed
    }),
  ],
  secret: process.env.JWT_SECRET, // Replace with a strong secret
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SECRET, // Same secret for signing
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
});
