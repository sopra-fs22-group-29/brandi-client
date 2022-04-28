import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import React, { useRef } from "react";

export const Card = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(props.url);
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

Card.propTypes = {
  url: PropTypes.string,
};
