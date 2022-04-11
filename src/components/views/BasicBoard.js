import { Canvas } from "@react-three/fiber";
import { Board } from "components/ui/Board";
import { MarbleBlue } from "components/ui/MarbleBlue";
import { MarbleGreen } from "components/ui/MarbleGreen";
import { MarbleRed } from "components/ui/MarbleRed";
import { MarbleYellow } from "components/ui/MarbleYellow";
import { connect, executeExampleMove } from "helpers/webSocket";
import { Suspense } from "react";

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const BasicBoard = (props) => {
  connect();
  return (
    // Box example
    // <Canvas camera={{ position: [0, 0, 7], near: 1, far: 100, fov: 45 }}>
    //   <ambientLight />
    //   <pointLight position={[10, 10, 10]} />
    //   <Box position={[-1.2, 0, 0]} />
    //   <Box position={[1.2, 0, 0]} />
    // </Canvas>

    // Loading our brändy dog board
    <div style={{ height: "100%", width: "100%" }}>
      <button
        onClick={() => executeExampleMove()}
        style={{
          zIndex: "10",
          position: "absolute",
          left: "50%",
          top: "10%",
          height: "50px",
          width: "100px",
        }}
      >
        Click to Move
      </button>
      <Canvas>
        <Suspense fallback={null}>
          <Board />
          {/* 1. blue */}
          <MarbleBlue position={[0, 0.01, 0.521]} />
          {/* 2. blue */}
          <MarbleBlue position={[-0.07, 0.01, 0.521]} />
          {/* 3. blue */}
          <MarbleBlue position={[-0.14, 0.01, 0.521]} />
          {/* 4. blue */}
          <MarbleBlue position={[-0.21, 0.01, 0.519]} />
          {/* 1. yellow */}
          <MarbleYellow position={[-0.52, 0.01, -0.205]} />
          {/* 2. yellow */}
          <MarbleYellow position={[-0.52, 0.01, -0.14]} />
          {/* 3. yellow */}
          <MarbleYellow position={[-0.52, 0.01, -0.07]} />
          {/* 4. yellow */}
          <MarbleYellow position={[-0.52, 0.01, 0]} />
          {/* 1. green */}
          <MarbleGreen position={[0.517, 0.01, 0.201]} />
          {/* 2. green */}
          <MarbleGreen position={[0.517, 0.01, 0.13]} />
          {/* 3. green */}
          <MarbleGreen position={[0.517, 0.01, 0.065]} />
          {/* 4. green */}
          <MarbleGreen position={[0.517, 0.01, -0.005]} />
          {/* 1. red */}
          <MarbleRed position={[0.21, 0.01, -0.52]} />
          {/* 2. red */}
          <MarbleRed position={[0.14, 0.01, -0.52]} />
          {/* 3. red */}
          <MarbleRed position={[0.07, 0.01, -0.52]} />
          {/* 4. red */}
          <MarbleRed position={[0.001, 0.01, -0.52]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BasicBoard;
