import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const KH = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/cards/KH.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0]}>
        <ambientLight
          intensity={0.1}
          decay={2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
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

useGLTF.preload("gltf/cards/KH.gltf");
