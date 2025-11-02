"use client";
import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

import { PartlyCloudyModel } from "../models/PartlyCloudy";
import { SunnyModel } from "../models/Sunny.jsx";
import { CloudyModel } from "../models/Cloudy";
import { HeavyRainModel } from "../models/HeavyRain";
import { StormModel } from "../models/Storm";
import { LightRainModel } from "../models/LightRain";
import { SnowModel } from "../models/Snow";
import { LightSnowModel } from "../models/LightSnow";
import { HeavySnowModel } from "../models/HeavySnow";
import { RainModel } from "../models/Rain";
import { SleetModel } from "../models/Sleet";
import { CloudyNightModel } from "../models/CloudyNight";
import { NightModel } from "../models/Night";

interface WeatherProps {
  code: number;
  is_day: 0 | 1;
}

function useGlobalPointer() {
  const target = React.useRef({ x: 0, y: 0 });
  React.useEffect(() => {
    function onMove(e: MouseEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // [-1..1]
      const ny = -(e.clientY / window.innerHeight) * 2 + 1; // [-1..1]
      target.current.x = nx;
      target.current.y = ny;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return target;
}

function ModelByCode({ code, is_day }: { code: number; is_day: 0 | 1 }) {
  const Comp = useMemo(() => {
    if (code === 1000) return is_day ? SunnyModel : NightModel; // Clear / Sunny

    if (code === 1003) return is_day ? PartlyCloudyModel : CloudyNightModel; // Partly Cloudy
    if ([1006, 1009].includes(code)) return CloudyModel; // Cloudy / Overcast
    if ([1030, 1135, 1147].includes(code)) return CloudyModel; // Mist/Fog

    if ([1063, 1150, 1153, 1180, 1183].includes(code)) return LightRainModel; // Light rain
    if ([1186, 1189, 1192, 1195, 1198, 1201].includes(code))
      return HeavyRainModel; // Heavy rain

    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return StormModel; // Thunder

    if ([1066, 1114, 1210, 1213, 1216].includes(code)) return LightSnowModel; // Light snow
    if ([1117, 1219, 1222, 1225].includes(code)) return HeavySnowModel; // Heavy snow

    if ([1204, 1207, 1249, 1252].includes(code)) return SnowModel; // General snow

    if (
      [1069, 1072, 1168, 1171, 1198, 1201, 1204, 1207, 1249, 1252].includes(
        code
      )
    )
      return SleetModel; // Sleet/Ice

    if ([1189, 1240, 1243, 1246].includes(code)) return RainModel; // Generic rain

    return is_day ? PartlyCloudyModel : NightModel; // Fallback
  }, [code, is_day]);

  if (!Comp) return null;

  return <Comp />;
}

function TiltGroup({
  pointer,
  children,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    const maxTilt = 0.2; // ~20°
    const tx = -pointer.current.y * maxTilt;
    const ty = pointer.current.x * maxTilt;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      tx,
      0.08
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      ty,
      0.08
    );
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene({ code, is_day }: WeatherProps) {
  const pointer = useGlobalPointer();

  return (
    <div className="h-[350px] w-[450px]">
      <Canvas>
        <Suspense fallback={null}>
          <TiltGroup pointer={pointer}>
            <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.08}>
              <CloudyModel />
            </Float>
          </TiltGroup>
        </Suspense>

        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[10, 10, 10]} decay={0.1} intensity={Math.PI} />
      </Canvas>
    </div>
  );
}
