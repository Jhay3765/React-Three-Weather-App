"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  // Create random star positions
  const positions = React.useMemo(() => {
    const arr = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 2000;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return arr;
  }, []);

  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Animate rotation + tilt
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005; // slow drift
      starsRef.current.rotation.x = THREE.MathUtils.lerp(
        starsRef.current.rotation.x,
        mouse.current.y,
        0.05
      );
      starsRef.current.rotation.y = THREE.MathUtils.lerp(
        starsRef.current.rotation.y,
        mouse.current.x,
        0.05
      );
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        {/* ✅ FIX: Use args to construct the BufferAttribute */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} // <-- fixes the error
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={1.2}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default function DarkBackground() {
  return (
    <div className="absolute inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 800] }}>
        <color attach="background" args={["#000000"]} />
        <Stars />
      </Canvas>
    </div>
  );
}
