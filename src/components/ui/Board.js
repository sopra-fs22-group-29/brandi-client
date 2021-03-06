import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import "styles/views/Game.scss";

const getIndex = (color) => {
  switch (color) {
    case "GREEN":
      return 0;
    case "BLUE":
      return 1;
    case "YELLOW":
      return 2;
    case "RED":
      return 3;
  }
};

const cameraPositions = [
  {
    position: [1.83, 1.15, 1.72],
    rotation: [1.24, 0.33, -0.76],
  },
  {
    position: [-1.83, 1.15, 1.72],
    rotation: [1.24, -0.33, 0.76],
  },
  {
    position: [-1.7, 1.1, -1.7],
    rotation: [1.92, -0.33, 2.41],
  },
  {
    position: [1.7, 1.1, -1.7],
    rotation: [1.92, 0.33, -2.41],
  },
];

export const Board = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("gltf/blender_dog_v0.1.gltf");

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 8.16, 0]}>
        <pointLight
          castShadow
          intensity={1}
          decay={2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>

      <group
        position={cameraPositions[getIndex(props.playerColor)].position}
        rotation={cameraPositions[getIndex(props.playerColor)].rotation}
      >
        <PerspectiveCamera
          makeDefault={true}
          far={100}
          near={0.1}
          fov={22.9}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>

      <mesh
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[0.6, 0.01, 0.6]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
        position={[-0.139, 0.008, 0.522]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
        position={[0, 0.01, 0.522]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        position={[-0.209, 0.0077, 0.52]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={nodes.Circle003.material}
        position={[-0.07, 0.009, 0.522]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle004.geometry}
        material={nodes.Circle004.material}
        position={[-0.332, 0.01, 0.525]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={nodes.Circle005.material}
        position={[-0.35, 0.0093, 0.42]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle006.geometry}
        material={nodes.Circle006.material}
        position={[-0.35, 0.01, 0.35]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle007.geometry}
        material={nodes.Circle007.material}
        position={[-0.305, 0.011, 0.305]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle008.geometry}
        material={nodes.Circle008.material}
        position={[-0.258, 0.011, 0.255]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle009.geometry}
        material={nodes.Circle009.material}
        position={[-0.52, 0.008, -0.139]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle010.geometry}
        material={nodes.Circle010.material}
        position={[-0.52, 0.009, 0]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle011.geometry}
        material={nodes.Circle011.material}
        position={[-0.52, 0.008, -0.205]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle012.geometry}
        material={nodes.Circle012.material}
        position={[-0.52, 0.01, -0.069]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle013.geometry}
        material={nodes.Circle013.material}
        position={[-0.525, 0.008, -0.335]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle014.geometry}
        material={nodes.Circle014.material}
        position={[-0.42, 0.01, -0.35]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle015.geometry}
        material={nodes.Circle015.material}
        position={[-0.35, 0.01, -0.35]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle016.geometry}
        material={nodes.Circle016.material}
        position={[-0.3, 0.0105, -0.305]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle017.geometry}
        material={nodes.Circle017.material}
        position={[-0.255, 0.0105, -0.255]}
        rotation={[0, -1.57, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle018.geometry}
        material={nodes.Circle018.material}
        position={[0.14, 0.008, -0.52]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle019.geometry}
        material={nodes.Circle019.material}
        position={[0.002, 0.008, -0.52]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle020.geometry}
        material={nodes.Circle020.material}
        position={[0.21, 0.008, -0.52]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle021.geometry}
        material={nodes.Circle021.material}
        position={[0.07, 0.008, -0.52]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle022.geometry}
        material={nodes.Circle022.material}
        position={[0.3345, 0.008, -0.525]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle023.geometry}
        material={nodes.Circle023.material}
        position={[0.35, 0.01, -0.42]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle024.geometry}
        material={nodes.Circle024.material}
        position={[0.35, 0.01, -0.35]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle025.geometry}
        material={nodes.Circle025.material}
        position={[0.305, 0.011, -0.3]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle026.geometry}
        material={nodes.Circle026.material}
        position={[0.256, 0.012, -0.253]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle027.geometry}
        material={nodes.Circle027.material}
        position={[0.52, 0.008, 0.135]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle028.geometry}
        material={nodes.Circle028.material}
        position={[0.52, 0.008, 0]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle029.geometry}
        material={nodes.Circle029.material}
        position={[0.52, 0.008, 0.205]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle030.geometry}
        material={nodes.Circle030.material}
        position={[0.52, 0.008, 0.07]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle031.geometry}
        material={nodes.Circle031.material}
        position={[0.52, 0.008, 0.33]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle032.geometry}
        material={nodes.Circle032.material}
        position={[0.418, 0.01, 0.347]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle033.geometry}
        material={nodes.Circle033.material}
        position={[0.35, 0.01, 0.35]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle034.geometry}
        material={nodes.Circle034.material}
        position={[0.3, 0.011, 0.303]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
      <mesh
        receiveShadow
        geometry={nodes.Circle035.geometry}
        material={nodes.Circle035.material}
        position={[0.25, 0.011, 0.252]}
        rotation={[0, 1.55, 0]}
        scale={[0.03, 1, 0.03]}
      />
    </group>
  );
};

useGLTF.preload("gltf/blender_dog_v0.1.gltf");
