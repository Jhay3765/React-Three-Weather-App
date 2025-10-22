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
      <div className="p-5 w-full text-white rounded-xl bg-black/40 backdrop-blur-2xl">
        <h2 className="text-center font-semibold mb-3 text-lg">
          3-Day Forecast
        </h2>
        <ul className="flex flex-col divide-y divide-white/20">
          {days.map((d, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-2 text-sm sm:text-base"
            >
              <span className="w-16 font-medium">{d.day}</span>

              <img
                src={
                  weatherCodes[d.code]?.day ||
                  "/assets/models/weatherIcons/clear-day.png"
                }
                alt={d.weather}
                className="w-8 h-8"
              />

              <span className="opacity-80">{d.weather}</span>
              <span className="font-semibold">
                {d.hi}&deg; / {d.lo}&deg;
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // === DESKTOP: single-day card ===
  return (
    <div className="p-4 sm:p-5 w-full sm:w-60 md:w-64 h-56 sm:h-64 flex flex-col justify-between text-white rounded-xl bg-black/40 backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.03]">
      <section className="flex justify-between items-center text-sm sm:text-base">
        <h2 className="font-medium">{day}</h2>
        <p>
          {hi}&deg; / {lo}&deg;
        </p>
      </section>

      <img
        src={
          weatherCodes[code!]?.day ||
          "/assets/models/weatherIcons/clear-day.png"
        }
        alt={weather}
        className="w-20 sm:w-24 mx-auto"
      />

      <section className="text-center text-sm sm:text-base opacity-90">
        {weather}
      </section>
    </div>
  );
}
