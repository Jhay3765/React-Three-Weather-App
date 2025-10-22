import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function LightRainModel(props) {
  const { nodes, materials } = useGLTF("/assets/models/LightRain.glb");
  return (
    <group scale={35} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_41.geometry}
        material={materials.material}
        position={[-0.003, -0.001, -0.005]}
        scale={[0.145, 0.099, 0.073]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_107.geometry}
        material={materials.material_20}
        position={[0.007, -0.067, 0.02]}
        rotation={[0, 0, 0.509]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/LightRain.glb");
