import React from "react";
import { useGLTF } from "@react-three/drei";

const BASE_SCALE = 20;

export function CloudyModel(props) {
  const gltf = useGLTF("/assets/models/Cloudy.glb");
  
  if (!gltf || !gltf.nodes || !gltf.materials) {
    return null;
  }
  
  const { nodes, materials } = gltf;

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
