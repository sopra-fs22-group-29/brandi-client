import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const NineC = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/cards/9C.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        rotation={[Math.PI / 3.1, Math.PI / 5.8, -Math.PI / 8]}
        scale={[0.055, 0.1, 0.08]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.FontFace}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.BackFace}
        />
      </group>
    </group>
  );
};

useGLTF.preload("gltf/cards/9C.gltf");
