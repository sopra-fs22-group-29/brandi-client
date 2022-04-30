import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

export const Card = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(props.url);
  const playerColor = props.playerColor;
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active
      ? [0.08, 0.4, 0.1]
      : hover
      ? [0.06, 0.3, 0.085]
      : [0.055, 0.1, 0.08],
    config: { duration: 100 },
  });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

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
      <animated.group
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        rotation={rotation}
        scale={scale}
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
      </animated.group>
    </group>
  );
};

Card.propTypes = {
  url: PropTypes.string,
};
