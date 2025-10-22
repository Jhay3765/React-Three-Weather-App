import React from "react";

export default function BottomWeatherPanel({
  temp,
  condition,
  hi,
  lo,
  humidity,
  windMph,
  feelsLike,
  visibilityMi,
}: {
  temp?: number;
  condition?: string;
  hi?: number;
  lo?: number;
  humidity?: number;
  windMph?: number;
  feelsLike?: number;
  visibilityMi?: number;
}) {
  return (
    <div className="lg:fixed mt-24 lg:mt-0 bottom-0 left-0 px-4 sm:px-8 py-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end  text-white z-50">
      {/* === Left Section: Temp & Condition === */}
      <section className="flex gap-3 items-end">
        <div className="text-5xl sm:text-7xl font-light">{temp ?? "--"}</div>
        <aside className="flex flex-col justify-end text-sm sm:text-base leading-snug">
          <p className="capitalize">{condition || "—"}</p>
          <p>
            H: {hi ?? "—"}&deg; L: {lo ?? "—"}&deg;
          </p>
        </aside>
      </section>

      {/* === Right Section: Details === */}
      <section className="text-xs sm:text-sm mt-4 sm:mt-0 leading-6 sm:leading-7 w-full sm:w-auto flex flex-wrap sm:flex-col justify-between sm:justify-end gap-x-4">
        <p>
          <span className="uppercase font-semibold opacity-80">Humidity </span>
          {humidity ?? "—"}%
        </p>
        <p>
          <span className="uppercase font-semibold opacity-80">Wind</span>{" "}
          {windMph ?? "—"} mph
        </p>
        <p>
          <span className="uppercase font-semibold opacity-80">Feels like</span>{" "}
          {feelsLike ?? "—"}&deg;
        </p>
        <p>
          <span className="uppercase font-semibold opacity-80">Visibility</span>{" "}
          {visibilityMi ?? "—"} mi
        </p>
      </section>
    </div>
  );
}
