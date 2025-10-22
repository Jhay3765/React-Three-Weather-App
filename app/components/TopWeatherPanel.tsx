import React, { useState } from "react";

export const TopWeatherPanel = ({
  name,
  region,
  updatedAt,
  onSearch,
}: {
  name: string;
  region: string;
  updatedAt?: string;
  onSearch: (q: string) => void;
}) => {
  const [val, setVal] = useState("");

  return (
    <section className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-6 px-4 sm:px-0">
      {/* === Location Info === */}
      <div className="leading-tight text-center sm:text-left">
        <p className="font-semibold text-lg sm:text-xl">{name}</p>
        <p className="text-sm sm:text-base opacity-90">{region}</p>
        {updatedAt && (
          <p className="text-xs sm:text-sm opacity-70 mt-1">{updatedAt}</p>
        )}
      </div>

      {/* === Search Field === */}
      <div className="flex w-full sm:w-auto justify-center sm:justify-end flex-wrap sm:flex-nowrap gap-2">
        <input
          type="text"
          className="w-full sm:w-72 px-4 py-2 border border-white/30 rounded-full bg-white/10 placeholder-white/70 text-sm focus:outline-none text-center sm:text-left"
          placeholder="City or ZIP (e.g., Lawrenceville,GA)"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && val.trim()) onSearch(val.trim());
          }}
        />
        <button
          className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm sm:text-base whitespace-nowrap"
          onClick={() => val.trim() && onSearch(val.trim())}
        >
          Search
        </button>
      </div>
    </section>
  );
};
