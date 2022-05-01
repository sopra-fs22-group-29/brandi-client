import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { selectMarble } from "helpers/webSocket";
import React, { useEffect, useRef, useState } from "react";

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

  const [hover, setHover] = useState(false);
  const active =
    props.selectState !== "card" && props.selectedBallId == props.ballId;

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  const { position } = useSpring({
    position:
      props.selectState !== "card" && (hover || props.isHighlighted)
        ? [props.position[0], 0.02, props.position[2]]
        : props.position,
    config: { duration: 100 },
  });

  return (
    <animated.group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      onPointerOver={(event) => {
        if (props.isHighlighted) {
          setHover(true);
        }
      }}
      onPointerOut={(event) => {
        if (props.isHighlighted) {
          setHover(false);
        }
      }}
      onClick={(event) => {
        if (!props.isHighlighted) return;
        selectMarble(
          props.selectedCardIndex,
          props.rank,
          props.suit,
          props.ballId
        );
      }}
    >
      <mesh
        geometry={nodes.Sphere.geometry}
        material={getMaterial(materials, props.color, hover)}
        scale={active ? 0.1 : 0.09}
      >
        {props.selectState !== "card" && (hover || active) && (
          <meshPhysicalMaterial />
        )}
      </mesh>
    </animated.group>
  );
};
