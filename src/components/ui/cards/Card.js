import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import React, { useRef } from "react";

export const Card = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(props.url);
  const playerColor = props.playerColor;

  let rotation = [Math.PI / 3, Math.PI / 6, -Math.PI / 4];
  if (playerColor === "RED") {
    rotation = [-Math.PI / 3.2, -Math.PI / 6.2, -Math.PI / 5];
  } else if (playerColor === "BLUE") {
    rotation = [Math.PI / 3.2, -Math.PI / 6, Math.PI / 5];
  } else if (playerColor === "YELLOW") {
    rotation = [-Math.PI / 3.2, Math.PI / 6, Math.PI / 5];
  }
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={rotation} scale={[0.055, 0.1, 0.08]}>
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

Card.propTypes = {
  url: PropTypes.string,
};
