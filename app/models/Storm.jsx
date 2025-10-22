import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function StormModel(props) {
  const { nodes, materials } = useGLTF("/assets/models/Storm.glb");
  return (
    <group scale={35} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.material_2}
        position={[-0.004, -0.038, 0.023]}
        scale={[0.066, 0.115, 0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_11.geometry}
        material={materials.material_3}
        position={[-0.001, 0.002, -0.004]}
        scale={[0.145, 0.099, 0.073]}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/Storm.glb");
