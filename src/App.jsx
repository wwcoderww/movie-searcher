import React, { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDMzNzliMDkzNTVhZDQwYjJjM2IwMmE2ZGE5OTkxNCIsIm5iZiI6MTc1MTEyMTQ3NC42Niwic3ViIjoiNjg1ZmZlNDJmMDAyMDU4MDdlMGQ4ZTdlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1KFaAg4O_KhMzheWDyFRzmkxbcNcUolGdKtEnU589gc",
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchMovies() {
    setIsLoading(true);
    try {
      await fetch(API_URL, API_OPTIONS)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch movies");
          return res.json();
        })
        .then((data) => {
          // If everything works
          errorMsg && setErrorMsg("");
          console.log(data.results);
          setMovies(data.results);
        });
    } catch (error) {
      // If any errors
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <main>
        <div></div>
        <div>
          <header>
            <h1>Next Movie</h1>
          </header>
          {isLoading ? (
            <LoadingSpinner />
          ) : errorMsg ? (
            <p>Error: {errorMsg || `Failed`}</p>
          ) : (
            movies && (
              <ul>
                {movies.map((movie) => (
                  <p key={movie.id}>{movie.title}</p>
                ))}
              </ul>
            )
          )}
        </div>
      </main>
    </div>
  );
}
