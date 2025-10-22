import React from "react";
import { useGLTF } from "@react-three/drei";

const BASE_SCALE = 20;

export function CloudyModel(props) {
  const { nodes, materials } = useGLTF("/assets/models/Cloudy.glb");

  return (
    <group scale={BASE_SCALE} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_33.geometry}
        material={materials.material}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/Cloudy.glb");
