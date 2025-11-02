"use client";
import React from "react";

interface LightBackgroundProps {
  isDay?: 0 | 1;
  weatherCode?: number;
}

function getGradientForWeather(isDay: 0 | 1, code?: number): string {
  // Day gradients
  if (isDay === 1) {
    // Clear/Sunny (1000)
    if (code === 1000) {
      return "linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #FFF5E1 100%)";
    }
    // Partly Cloudy (1003)
    if (code === 1003) {
      return "linear-gradient(to bottom, #B8D4E8 0%, #D4E5F5 50%, #F0F8FF 100%)";
    }
    // Cloudy/Overcast (1006, 1009)
    if ([1006, 1009].includes(code || 0)) {
      return "linear-gradient(to bottom, #A0A0A0 0%, #C0C0C0 50%, #E0E0E0 100%)";
    }
    // Rain (1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246)
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code || 0)) {
      return "linear-gradient(to bottom, #6B7A8F 0%, #8A9BA8 50%, #B8C5D1 100%)";
    }
    // Storm/Thunder (1087, 1273, 1276, 1279, 1282)
    if ([1087, 1273, 1276, 1279, 1282].includes(code || 0)) {
      return "linear-gradient(to bottom, #4A5568 0%, #5A6578 50%, #6B7788 100%)";
    }
    // Snow (1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252)
    if ([1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252].includes(code || 0)) {
      return "linear-gradient(to bottom, #E8F0F5 0%, #F0F5FA 50%, #F8FBFC 100%)";
    }
    // Sleet (1069, 1072, 1168, 1171)
    if ([1069, 1072, 1168, 1171].includes(code || 0)) {
      return "linear-gradient(to bottom, #9FA8B5 0%, #B8C5D1 50%, #D1D9E6 100%)";
    }
    // Fog/Mist (1030, 1135, 1147)
    if ([1030, 1135, 1147].includes(code || 0)) {
      return "linear-gradient(to bottom, #D3D3D3 0%, #E0E0E0 50%, #F0F0F0 100%)";
    }
    // Default sunny day
    return "linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #FFF5E1 100%)";
  }

  // Night gradients
  // Clear Night (1000)
  if (code === 1000) {
    return "linear-gradient(to bottom, #0A0E27 0%, #1A1F3A 50%, #2D3142 100%)";
  }
  // Partly Cloudy Night (1003)
  if (code === 1003) {
    return "linear-gradient(to bottom, #1A1F2E 0%, #2A2F3E 50%, #3A3F4E 100%)";
  }
  // Cloudy Night (1006, 1009)
  if ([1006, 1009].includes(code || 0)) {
    return "linear-gradient(to bottom, #1E1E2E 0%, #2E2E3E 50%, #3E3E4E 100%)";
  }
  // Rain Night
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(code || 0)) {
    return "linear-gradient(to bottom, #1A1F27 0%, #2A2F37 50%, #3A3F47 100%)";
  }
  // Storm Night
  if ([1087, 1273, 1276, 1279, 1282].includes(code || 0)) {
    return "linear-gradient(to bottom, #0F1115 0%, #1A1D25 50%, #252935 100%)";
  }
  // Snow Night
  if ([1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1249, 1252].includes(code || 0)) {
    return "linear-gradient(to bottom, #1E2025 0%, #2E3035 50%, #3E4045 100%)";
  }
  // Default night
  return "linear-gradient(to bottom, #0A0E27 0%, #1A1F3A 50%, #2D3142 100%)";
}

export default function LightBackground({ isDay = 1, weatherCode }: LightBackgroundProps) {
  const gradient = getGradientForWeather(isDay, weatherCode);

  return (
    <div
      className="fixed h-screen inset-0 -z-20 transition-all duration-1000 ease-in-out"
      style={{
        background: gradient,
      }}
    />
  );
}
