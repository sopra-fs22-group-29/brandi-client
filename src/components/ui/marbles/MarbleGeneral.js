import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

const getGLTF = (color) => {
  switch (color) {
    case "BLUE":
      return "gltf/marbles/marble_blue.gltf";
    case "GREEN":
      return "gltf/marbles/marble_green.gltf";
    case "RED":
      return "gltf/marbles/marble_red.gltf";
    case "YELLOW":
      return "gltf/marbles/marble_yellow.gltf";
  }
};

const getMaterial = (material, color) => {
  switch (color) {
    case "BLUE":
      return material.Blau;
    case "GREEN":
      return material.Grün;
    case "RED":
      return material.Rot;
    case "YELLOW":
      return material.Gelb;
  }
};

export const MarbleGeneral = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(getGLTF(props.color));
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Sphere.geometry}
        material={getMaterial(materials, props.color)}
        scale={0.09}
      />
    </group>
  );
};
