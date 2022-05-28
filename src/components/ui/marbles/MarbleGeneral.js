import { animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { selectMarble } from "helpers/webSocket";
import React, { createRef, forwardRef, useEffect, useState } from "react";

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

export const MarbleGeneral = forwardRef((props, ref) => {
  var group;
  if (ref === null) {
    group = createRef();
    props.state.balls[props.index].ballRef = group;
    props.setState({ ...props.state });
  } else {
    group = ref;
  }

  const { nodes, materials } = useGLTF(getGLTF(props.color));
  const [hover, setHover] = useState(false);
  const active =
    props.selectState !== "card" && props.selectedBallId == props.ballId;

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  useFrame(() => {
    if (props.isHighlighted) {
      if (group.current.position.y < 0.02) {
        group.current.position.y += 0.0025;
      }
    } else if (group.current.position.y > 0.01) {
      group.current.position.y -= 0.0025;
    }
  });

  return (
    <animated.group
      ref={group}
      {...props}
      position={props.position}
      dispose={null}
      onPointerOver={(event) => {
        if (props.isHighlighted) {
          setHover(true);
        }
      }}
      castShadow
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
        castShadow
      >
        {props.selectState !== "card" && (hover || active) && (
          <meshPhysicalMaterial />
        )}
      </mesh>
    </animated.group>
  );
});
