import { NextResponse } from "next/server";

const BASE = "https://api.weatherapi.com/v1";

export const runtime = "nodejs"; // or "edge" if you prefer

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Inputs you can pass from the client:
  const q = searchParams.get("q") || "Lawrenceville,GA";
  const days = searchParams.get("days") || "3"; // 1..10 on free tier
  const aqi = searchParams.get("aqi") || "no";
  const alerts = searchParams.get("alerts") || "no";

  if (!process.env.WEATHERAPI_KEY) {
    return NextResponse.json(
      { error: "Missing WEATHERAPI_KEY" },
      { status: 500 }
    );
  }

  // Choose endpoint: forecast gives you current + future days in one call
  const url = `${BASE}/forecast.json?key=${
    process.env.WEATHERAPI_KEY
  }&q=${encodeURIComponent(q)}&days=${days}&aqi=${aqi}&alerts=${alerts}`;

  try {
    // Revalidate every 10 minutes to lighten your quota
    const res = await fetch(url, { next: { revalidate: 600 } });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "WeatherAPI error", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Helpful cache headers for Vercel/Edge/CDN
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=600, stale-while-revalidate=60",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Network error", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}
