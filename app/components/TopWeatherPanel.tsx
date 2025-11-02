import React, { useState, useRef, useEffect } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when search opens on mobile
  useEffect(() => {
    if (searchOpened && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpened]);

  // Close mobile search when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      // xl breakpoint is 1280px in Tailwind
      if (window.innerWidth >= 1280 && searchOpened) {
        setSearchOpened(false);
        setVal("");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchOpened]);

  const handleSearch = () => {
    if (val.trim()) {
      onSearch(val.trim());
      setVal("");
      setSearchOpened(false);
    }
  };

  const handleClose = () => {
    setSearchOpened(false);
    setVal("");
  };

  return (
    <nav className="w-full">
      {!searchOpened ? (
        <section className="flex flex-row p-4 sm:p-4 justify-between items-start sm:items-center w-full gap-4 sm:gap-6">
          {/* === Location Info === */}
          <div className="leading-tight text-left flex-1 min-w-0">
            <p className="font-semibold text-2xl sm:text-3xl mb-1">{name}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <p className="text-base sm:text-xl opacity-90">{region}</p>
            </div>
          </div>

          {/* === Desktop Search (hidden on mobile) === */}
          <div className="hidden xl:flex w-full sm:w-auto justify-end gap-2">
            <input
              type="text"
              className="w-full sm:w-72 px-4 py-2 border border-white/30 rounded-full bg-white/10 placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 text-left"
              placeholder="City or ZIP (e.g., Lawrenceville,GA)"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm whitespace-nowrap transition-colors"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* === Mobile Search Button (right side) === */}
          <button
            onClick={() => setSearchOpened(true)}
            className="xl:hidden flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 active:scale-95 flex-shrink-0"
            aria-label="Search"
          >
            <SearchSvg />
          </button>
        </section>
      ) : (
        /* === Mobile Search Expanded (full width) === */
        <div className="w-full p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-white/30 rounded-xl bg-white/10 backdrop-blur-sm">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent placeholder-white/60 text-base focus:outline-none text-left"
                placeholder="Enter city or ZIP code"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  } else if (e.key === "Escape") {
                    handleClose();
                  }
                }}
              />
            </div>
            <button
              className="px-4 py-3 rounded-xl bg-white/25 hover:bg-white/35 backdrop-blur-sm text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSearch}
              disabled={!val.trim()}
            >
              Search
            </button>
            <button
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 flex-shrink-0"
              onClick={handleClose}
              aria-label="Close search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
