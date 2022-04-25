import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const MarbleYellow = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/marbles/marble_yellow.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Sphere.geometry}
        material={materials.Gelb}
        scale={0.09}
      />
    </group>
  );
};

useGLTF.preload("gltf/marbles/marble_yellow.gltf");
