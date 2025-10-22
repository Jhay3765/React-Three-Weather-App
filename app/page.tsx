"use client";
import React, { useEffect, useMemo, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Scene from "./components/Scene";
import LightBackground from "./components/LightBackgrount";
import isDayAt from "./utility/isDayat";
import BottomNavigationBar from "./components/BottomWeatherPanel";
import { TopWeatherPanel } from "./components/TopWeatherPanel";

type WeatherAPIResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_f: number;
    temp_c: number;
    feelslike_f: number;
    condition: { text: string; code: number };
    humidity: number;
    wind_mph: number;
    vis_miles: number;
    is_day: 0 | 1;
    // WeatherAPI adds these; used for timestamp
    last_updated?: string;
    last_updated_epoch?: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_f: number;
        mintemp_f: number;
        condition: { text: string; code: number };
      };
      astro: { sunrise: string; sunset: string };
      hour: Array<{
        time: string;
        is_day: 0 | 1;
        condition: { text: string; code: number };
        temp_f: number;
      }>;
    }>;
  };
};

export default function Page() {
  const [query, setQuery] = useState<string | null>(null);
  const [data, setData] = useState<WeatherAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastLocation");
    if (stored) {
      setQuery(stored);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const coords = `${lat},${lon}`;
          localStorage.setItem("lastLocation", coords);
          setQuery(coords);
        },
        (error) => {
          console.error("Geolocation denied:", error);
          // fallback if permission denied
          const fallback = "Lawrenceville,GA";
          localStorage.setItem("lastLocation", fallback);
          setQuery(fallback);
        }
      );
    } else {
      const fallback = "Lawrenceville,GA";
      localStorage.setItem("lastLocation", fallback);
      setQuery(fallback);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(
          `/api/weather?q=${encodeURIComponent(query)}&days=3`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as WeatherAPIResponse;
        console.log(json);
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Failed to load weather");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [query]);

  const threeDays = useMemo(() => {
    return (
      data?.forecast?.forecastday?.map((d) => ({
        day: new Date(`${d.date}T00:00:00`).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        hi: Math.round(d.day.maxtemp_f),
        lo: Math.round(d.day.mintemp_f),
        weather: d.day.condition.text,
        code: d.day.condition.code,
      })) ?? []
    );
  }, [data]);

  const sceneCode = data?.current?.condition.code ?? 1000;
  const sceneIsDay: 0 | 1 =
    data?.current?.is_day ??
    (data?.forecast?.forecastday?.[0] &&
    data?.location?.localtime &&
    data?.location?.tz_id
      ? isDayAt(
          data.location.localtime.replace(" ", "T"),
          data.forecast.forecastday[0].astro.sunrise,
          data.forecast.forecastday[0].astro.sunset,
          data.location.tz_id
        )
      : 0);

  const updatedAtText = useMemo(() => {
    if (!data?.current) return undefined;
    const tz = data?.location?.tz_id;
    const epoch = data.current.last_updated_epoch;
    if (typeof epoch === "number") {
      const date = new Date(epoch * 1000);
      const opts: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      };
      const formatted = tz
        ? new Intl.DateTimeFormat(undefined, { ...opts, timeZone: tz }).format(
            date
          )
        : date.toLocaleString(undefined, opts);
      return `Updated ${formatted}${tz ? ` (${tz})` : ""}`;
    }
    if (data.current.last_updated) {
      // Fall back to raw string from API (already in local time of the location)
      return `Updated ${data.current.last_updated}${tz ? ` (${tz})` : ""}`;
    }
    return undefined;
  }, [data]);

  return (
    <div className="h-screen p-1 xl:p-8 text-white">
      <LightBackground />
      <TopWeatherPanel
        name={data?.location?.name ?? "Loading..."}
        region={data?.location?.region ?? ""}
        updatedAt={updatedAtText}
        onSearch={(val) => {
          localStorage.setItem("lastLocation", val);
          setQuery(val);
        }}
      />

      <section className="w-fit  mx-auto">
        <Scene is_day={sceneIsDay} code={sceneCode} />
      </section>

      {loading && (
        <p className="text-center opacity-80 mt-4">Loading weather…</p>
      )}
      {err && <p className="text-center text-red-300 mt-4">Error: {err}</p>}

      <ul className="flex flex-col md:flex-row max-w-7xl justify-center mx-auto gap-4 mt-4">
        {threeDays.length > 0 ? (
          threeDays.map((d, i) => (
            <WeatherCard
              key={i}
              day={d.day}
              hi={d.hi}
              lo={d.lo}
              code={d.code}
              weather={d.weather}
            />
          ))
        ) : (
          <div>No Weather Available</div>
        )}
      </ul>

      <h2 className="text-3xl mt-4 text-center uppercase tracking-wider">
        THREE Day Forecast
      </h2>

      <BottomNavigationBar
        temp={Math.round(data?.current?.temp_f ?? 0)}
        condition={data?.current?.condition.text ?? ""}
        hi={threeDays[0]?.hi}
        lo={threeDays[0]?.lo}
        humidity={data?.current?.humidity}
        windMph={data?.current?.wind_mph}
        feelsLike={Math.round(data?.current?.feelslike_f ?? 0)}
        visibilityMi={data?.current?.vis_miles}
      />
    </div>
  );
}
