import React, { useState } from "react";
import SearchSvg from "./SearchSvg";

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
  const [searchOpened, setSearchOpened] = useState(false);
  const [val, setVal] = useState("");

  return (
    <nav>
      {!searchOpened ? (
        <section className="flex sm:flex-row p-2 justify-between items-center w-full gap-4 sm:gap-6 sm:px-0">
          {/* === Location Info === */}
          <div className="leading-tight  sm:text-left">
            <p className="font-semibold  text-3xl sm:text-3xl">{name}</p>
            <p className=" text-xl opacity-90">{region}</p>
            {/* {updatedAt && (
          <p className="text-xs sm:text-sm opacity-70 mt-1">{updatedAt}</p>
        )} */}
          </div>

          {/* === Search Field === */}
          <div
            onClick={() => setSearchOpened(true)}
            className="xl:hidden bg-white/10 p-2 rounded-full text-white"
          >
            <SearchSvg />
          </div>
          <div className="xl:flex hidden w-full sm:w-auto justify-center sm:justify-end flex-wrap sm:flex-nowrap gap-2">
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
      ) : (
        <div>
          <div className="xl:flex  w-full sm:w-auto justify-center sm:justify-end flex-wrap sm:flex-nowrap gap-2">
            <div className="px-4 py-2 border border-white/30 rounded-full bg-white/10 flex">
              <input
                type="text"
                className="w-full sm:w-72  placeholder-white/70 text-sm focus:outline-none text-center sm:text-left"
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
              <button
                className="w-14 ml-1 rounded-full bg-red-500/20 hover:bg-white/30 text-sm sm:text-base whitespace-nowrap"
                onClick={() => setSearchOpened(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
