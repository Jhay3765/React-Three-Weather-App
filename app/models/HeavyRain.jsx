import React from "react";
import { useGLTF, Float } from "@react-three/drei";

export function HeavyRainModel(props) {
  const { nodes, materials } = useGLTF("/assets/models/HeavyRain.glb");

  return (
    <group scale={35} dispose={null}>
      {/* Cloud */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_35.geometry}
        material={materials.material}
        position={[-0.011, -0.001, -0.007]}
        scale={[0.145, 0.099, 0.073]}
      />

      {/* Raindrops */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_97.geometry}
        material={materials.material_20}
        position={[-0.029, -0.064, 0.019]}
        rotation={[0, 0, 0.509]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_99.geometry}
        material={materials.material_20}
        position={[0.033, -0.062, 0.019]}
        rotation={[0, 0, 0.509]}
        scale={0.01}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_101.geometry}
        material={materials.material_20}
        position={[-0.004, -0.025, 0.019]}
        rotation={[0, 0, 0.509]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/HeavyRain.glb");
