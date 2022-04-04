import { Canvas } from "@react-three/fiber";
import Box from "components/ui/Box";
import { Scene } from "components/ui/Scene";
import { Suspense } from "react";

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const Test = (props) => {
  return (
    // Box example
    // <Canvas camera={{ position: [0, 0, 7], near: 1, far: 100, fov: 45 }}>
    //   <ambientLight />
    //   <pointLight position={[10, 10, 10]} />
    //   <Box position={[-1.2, 0, 0]} />
    //   <Box position={[1.2, 0, 0]} />
    // </Canvas>

    // Loading our brändy dog board
    <Canvas dpr={Math.max(window.devicePixelRatio, 2)}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default Test;
