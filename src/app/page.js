import Link from "next/link";

export default function Home() {
  return (
    <>
     <div className="container">
      <h1 className="title">MUSER</h1>
      <h2 className="subtitle">Judge your music taste</h2>
      <Link href="/api/login"
        className="login-button">Log in with Spotify
      </Link>
      </div>

    </>
  );
}
