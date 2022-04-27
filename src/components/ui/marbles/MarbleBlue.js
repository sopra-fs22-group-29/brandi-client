import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export const MarbleBlue = React.forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/marbles/marble_blue.gltf");
  return (
    <group ref={ref || group} {...props} dispose={null}>
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
});

useGLTF.preload("gltf/marbles/marble_blue.gltf");
