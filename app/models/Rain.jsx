import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function RainModel(props) {
  const { nodes, materials } = useGLTF("/assets/models/Rain.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_39.geometry}
        material={materials.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_103.geometry}
        material={materials.material_20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_105.geometry}
        material={materials.material_20}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/Rain.glb");
