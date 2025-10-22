"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function SkyParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1000;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 600;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    }
    return arr;
  }, []);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.1;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003;
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouse.current.y,
        0.03
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouse.current.x,
        0.03
      );
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={2.2}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export default function LightBackground() {
  return (
    <div className="absolute inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 600] }}>
        {/* 🌇 Afternoon sky tone — softer, warmer blue */}
        <color attach="background" args={["#1e3a8a"]} />

        {/* Gentle sunlight tone */}
        <ambientLight intensity={0.2} color="#ffe9b0" />

        {/* ☀️ Subtle, warm sun glow */}
        <mesh position={[0, 180, -400]}>
          <sphereGeometry args={[60, 32, 32]} />
          <meshBasicMaterial color="#ffe8a8" transparent opacity={0.5} />
        </mesh>

        <SkyParticles />
      </Canvas>
    </div>
  );
}
