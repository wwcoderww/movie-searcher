import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex rounded-lg bg-red-50 py-4">
      <div className="my-auto px-4">🔍</div>
      <input
        type="text"
        placeholder="Search Movies"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[32rem]"
      />
    </div>
  );
}
