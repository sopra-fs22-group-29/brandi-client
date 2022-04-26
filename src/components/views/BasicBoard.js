import { Canvas } from "@react-three/fiber";
import { Board } from "components/ui/Board";
import { AH } from "components/ui/cards/AH";
import { JH } from "components/ui/cards/JH";
import { KH } from "components/ui/cards/KH";
import { NineH } from "components/ui/cards/NineH";
import { QH } from "components/ui/cards/QH";
import { TenH } from "components/ui/cards/TenH";
import { MarbleBlue } from "components/ui/marbles/MarbleBlue";
import { MarbleGreen } from "components/ui/marbles/MarbleGreen";
import { MarbleRed } from "components/ui/marbles/MarbleRed";
import { MarbleYellow } from "components/ui/marbles/MarbleYellow";
import { connect } from "helpers/webSocket";
import { Suspense, useState } from "react";
import DatGui, { DatBoolean, DatFolder, DatNumber } from "react-dat-gui";

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const BasicBoard = (props) => {
  connect();
  const [datGuiState, setDatGuiState] = useState({
    showMarble: false,
    posX: 0,
    posY: 0.01,
    posZ: 0,
  });

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
      {/* <button
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
      </button> */}
      <Canvas>
        <Suspense fallback={null}>
          <Board />
          {/* marble to test with dat gui */}
          {datGuiState.showMarble && (
            <MarbleBlue
              position={[datGuiState.posX, datGuiState.posY, datGuiState.posZ]}
            />
          )}
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

          <KH position={[0.3, -0.02, 0.9]} />
          <QH position={[0.4, -0.04, 0.75]} />
          <JH position={[0.5, -0.06, 0.6]} />
          <AH position={[0.6, -0.08, 0.45]} />
          <TenH position={[0.7, -0.1, 0.3]} />
          <NineH position={[0.8, -0.12, 0.15]} />
        </Suspense>
      </Canvas>
      <DatGui data={datGuiState} onUpdate={setDatGuiState}>
        <DatFolder title="test marble" closed={false}>
          <DatBoolean path="showMarble" />
          <DatNumber path="posX" min={-0.7} max={0.7} step={0.001} />
          <DatNumber path="posY" min={-0.4} max={0.4} step={0.001} />
          <DatNumber path="posZ" min={-0.7} max={0.7} step={0.001} />
        </DatFolder>
      </DatGui>
    </div>
  );
};

export default BasicBoard;
