import React from "react";
import { weatherCodes } from "../utility/CodeToIconMap";

interface DayData {
  day: string;
  hi: number | string;
  lo: number | string;
  weather: string;
  code: number;
}

interface WeatherCardProps extends Partial<DayData> {
  combined?: boolean;
  days?: DayData[];
}

export default function WeatherCard({
  combined,
  days,
  day,
  hi,
  lo,
  code,
  weather,
}: WeatherCardProps) {
  if (combined && days) {
    // === MOBILE: combined 3-day forecast card ===
    return (
      <div className="p-6 w-full text-white rounded-xl bg-black/40 backdrop-blur-2xl border border-white/10">
        <h2 className="text-center font-semibold mb-4 text-lg uppercase tracking-wide">
          3-Day Forecast
        </h2>
        <ul className="flex flex-col divide-y divide-white/20">
          {days.map((d, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 gap-3 text-sm sm:text-base"
            >
              <span className="w-20 font-semibold text-base">{d.day}</span>

              <img
                src={
                  weatherCodes[d.code]?.day ||
                  "/assets/models/weatherIcons/clear-day.png"
                }
                alt={d.weather}
                className="w-10 h-10 flex-shrink-0"
              />

              <span className="opacity-80 flex-1 text-center text-sm">
                {d.weather}
              </span>
              <div className="flex items-center gap-1 font-semibold text-base">
                <span className="text-white">{d.hi}&deg;</span>
                <span className="opacity-60">/</span>
                <span className="opacity-70">{d.lo}&deg;</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // === DESKTOP: single-day card ===
  return (
    <div className="p-5 w-[200px] sm:w-[220px] h-[240px] sm:h-[260px] flex flex-col justify-between text-white rounded-xl bg-black/40 backdrop-blur-2xl border border-white/10 transition-transform duration-300 hover:scale-[1.03] hover:bg-black/50">
      <section className="flex justify-between items-center">
        <h2 className="font-semibold text-base sm:text-lg uppercase tracking-wide">
          {day}
        </h2>
        <p className="text-base sm:text-lg font-semibold">
          <span className="text-white">{hi}&deg;</span>
          <span className="opacity-60"> / </span>
          <span className="opacity-70">{lo}&deg;</span>
        </p>
      </section>

      <div className="flex-1 flex items-center justify-center my-2">
        <img
          src={
            weatherCodes[code!]?.day ||
            "/assets/models/weatherIcons/clear-day.png"
          }
          alt={weather}
          className="w-24 sm:w-28 h-24 sm:h-28 object-contain"
        />
      </div>

      <section className="text-center text-sm sm:text-base opacity-90 capitalize">
        {weather}
      </section>
    </div>
  );
}
