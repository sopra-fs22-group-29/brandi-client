import { useGLTF } from "@react-three/drei";
import { moveMarble } from "helpers/webSocket";
import React, { useEffect, useRef, useState } from "react";

export const CircleToClick = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/circleToClick.gltf");
  const { nodes: nodes2, materials: materials2 } = useGLTF(
    "gltf/circleHighlight.gltf"
  );

  const [hover, setHover] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      onClick={(event) => {
        moveMarble(props.card, props.selectedBallId, props.destinationTile);
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle036.geometry}
        material={materials["Material.002"]}
        scale={[0.021, 0.86, 0.021]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes2.Circle017.geometry}
        material={materials2.Gelb}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
    </group>
  );
};

useGLTF.preload("gltf/circleToClick.gltf");
