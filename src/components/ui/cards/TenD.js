import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const TenD = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/cards/0D.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        rotation={[Math.PI / 3, Math.PI / 6, -Math.PI / 4]}
        scale={[0.064, 0.1, 0.089]}
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

useGLTF.preload("gltf/cards/0D.gltf");
