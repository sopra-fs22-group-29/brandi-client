import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { selectCard } from "helpers/webSocket";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

export const Card = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(props.url);
  const playerColor = props.playerColor;
  const [hover, setHover] = useState(false);

  const { scale } = useSpring({
    scale:
      props.cardIndex == props.selectedIndex
        ? [0.0653125, 0.4, 0.095]
        : hover
        ? [0.0570625, 0.3, 0.083]
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
    <animated.group
      onClick={(event) => {
        event.stopPropagation();
        if (props.cardIndex !== props.selectedIndex) {
          selectCard(props.cardIndex, props.rank, props.suit);
        }
      }}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
      rotation={rotation}
      scale={scale}
      ref={group}
      {...props}
      dispose={null}
    >
      <group>
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
    </animated.group>
  );
};

Card.propTypes = {
  url: PropTypes.string,
};

useGLTF.preload("gltf/cards/AC.gltf");
useGLTF.preload("gltf/cards/AD.gltf");
useGLTF.preload("gltf/cards/AH.gltf");
useGLTF.preload("gltf/cards/AS.gltf");

useGLTF.preload("gltf/cards/2C.gltf");
useGLTF.preload("gltf/cards/2D.gltf");
useGLTF.preload("gltf/cards/2H.gltf");
useGLTF.preload("gltf/cards/2S.gltf");

useGLTF.preload("gltf/cards/3C.gltf");
useGLTF.preload("gltf/cards/3D.gltf");
useGLTF.preload("gltf/cards/3H.gltf");
useGLTF.preload("gltf/cards/3S.gltf");

useGLTF.preload("gltf/cards/4C.gltf");
useGLTF.preload("gltf/cards/4D.gltf");
useGLTF.preload("gltf/cards/4H.gltf");
useGLTF.preload("gltf/cards/4S.gltf");

useGLTF.preload("gltf/cards/5C.gltf");
useGLTF.preload("gltf/cards/5D.gltf");
useGLTF.preload("gltf/cards/5H.gltf");
useGLTF.preload("gltf/cards/5S.gltf");

useGLTF.preload("gltf/cards/6C.gltf");
useGLTF.preload("gltf/cards/6D.gltf");
useGLTF.preload("gltf/cards/6H.gltf");
useGLTF.preload("gltf/cards/6S.gltf");

useGLTF.preload("gltf/cards/7C.gltf");
useGLTF.preload("gltf/cards/7D.gltf");
useGLTF.preload("gltf/cards/7H.gltf");
useGLTF.preload("gltf/cards/7S.gltf");

useGLTF.preload("gltf/cards/8C.gltf");
useGLTF.preload("gltf/cards/8D.gltf");
useGLTF.preload("gltf/cards/8H.gltf");
useGLTF.preload("gltf/cards/8S.gltf");

useGLTF.preload("gltf/cards/9C.gltf");
useGLTF.preload("gltf/cards/9D.gltf");
useGLTF.preload("gltf/cards/9H.gltf");
useGLTF.preload("gltf/cards/9S.gltf");

useGLTF.preload("gltf/cards/0C.gltf");
useGLTF.preload("gltf/cards/0D.gltf");
useGLTF.preload("gltf/cards/0H.gltf");
useGLTF.preload("gltf/cards/0S.gltf");

useGLTF.preload("gltf/cards/JC.gltf");
useGLTF.preload("gltf/cards/JD.gltf");
useGLTF.preload("gltf/cards/JH.gltf");
useGLTF.preload("gltf/cards/JS.gltf");

useGLTF.preload("gltf/cards/QC.gltf");
useGLTF.preload("gltf/cards/QD.gltf");
useGLTF.preload("gltf/cards/QH.gltf");
useGLTF.preload("gltf/cards/QS.gltf");

useGLTF.preload("gltf/cards/KC.gltf");
useGLTF.preload("gltf/cards/KD.gltf");
useGLTF.preload("gltf/cards/KH.gltf");
useGLTF.preload("gltf/cards/KS.gltf");

useGLTF.preload("gltf/cards/X1.gltf");
