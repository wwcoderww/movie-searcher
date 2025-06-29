import React from "react";

export default function MovieCards({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  return (
    <div className="rounded-md border-2">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        className="w-85"
      />
      <div className="w-85 py-3">
        <p className="p-2 pb-1 text-2xl">{title}</p>
        <div className="flex px-2">
          <p className="mt-[.12rem]">⭐</p>
          <p className="text-xl">{vote_average.toFixed(1)}</p>
          <p className="text-md mt-auto flex-1">▪️{original_language}</p>
          <p className="mt-auto text-lg">{release_date.slice(0, 4)}</p>
        </div>
      </div>
    </div>
  );
}
