import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const MarbleBlue = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/marble_blue.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      {/* <group position={[0, 8.16, 0]}>
        <pointLight intensity={2} decay={2} rotation={[-Math.PI / 2, 0, 0]} />
      </group> */}
      <mesh
        geometry={nodes.Sphere.geometry}
        material={materials.Blau}
        scale={0.09}
      />
    </group>
  );
};

useGLTF.preload("gltf/Kugel_Blau.gltf");
