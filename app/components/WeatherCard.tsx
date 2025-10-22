import React from "react";
import { weatherCodes } from "../utility/CodeToIconMap";

interface Weathercard {
  day: string;
  hi: number | string;
  lo: number | string;
  weather: string;
  code: number;
}

export default function WeatherCard(props: Weathercard) {
  const { day, hi, lo, weather, code } = props;

  return (
    <li className="p-4 sm:p-5 w-full sm:w-60 md:w-64 h-56 sm:h-64 flex flex-col justify-between text-white rounded-xl bg-black/40 backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.03]">
      {/* === Top Section === */}
      <section className="flex justify-between items-center text-sm sm:text-base">
        <h2 className="font-medium">{day}</h2>
        <p>
          {hi}&deg; / {lo}&deg;
        </p>
      </section>

      {/* === Weather Icon === */}
      <img
        src={
          weatherCodes[code]?.day || "/assets/models/weatherIcons/clear-day.png"
        }
        alt={weather}
        className="w-20 sm:w-24 mx-auto"
      />

      {/* === Weather Text === */}
      <section className="text-center text-sm sm:text-base opacity-90">
        {weather}
      </section>
    </li>
  );
}
