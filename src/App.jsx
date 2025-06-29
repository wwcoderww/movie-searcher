import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import MovieCards from "./components/MovieCards";
import { useDebounce } from "react-use";

const API_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export default function App() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");

  useDebounce(() => setDebounceSearch(search), 500, [search]);

  async function fetchMovies(query) {
    const URL = query
      ? `${API_URL}/search/movie?query=${query}`
      : `${API_URL}/movie/popular?language=en-US&page=1`;
    setIsLoading(true);
    try {
      await fetch(URL, API_OPTIONS)
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
    fetchMovies(debounceSearch);
    console.log(import.meta.env.VITE_TESTING);
  }, [debounceSearch]);

  return (
    <div>
      <main>
        <div className="flex flex-col">
          <header className="mx-auto">
            <h1 className="text-9xl">Next Movie</h1>
          </header>
          <div className="mx-auto my-8">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : errorMsg ? (
            <p>Error: {errorMsg || `Failed`}</p>
          ) : (
            movies && (
              <ul className="flex flex-wrap justify-center gap-6">
                {movies.map((movie) => (
                  <MovieCards key={movie.id} movie={movie} />
                ))}
              </ul>
            )
          )}
        </div>
      </main>
    </div>
  );
}
