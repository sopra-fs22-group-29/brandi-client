import { Canvas } from "@react-three/fiber";
import { Board } from "components/ui/Board";
import { AH, JH, KH, NineH, QH, TenH } from "components/ui/cards/Cards";
import { MarbleBlue } from "components/ui/marbles/MarbleBlue";
import { MarbleGreen } from "components/ui/marbles/MarbleGreen";
import { MarbleRed } from "components/ui/marbles/MarbleRed";
import { MarbleYellow } from "components/ui/marbles/MarbleYellow";
import { connect, disconnect } from "helpers/webSocket";
import { Suspense, useEffect, useState } from "react";
import DatGui, { DatBoolean, DatFolder, DatNumber } from "react-dat-gui";
import { useParams } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";
import { Button } from "components/ui/Button";
import "styles/ui/Modal.scss";
import { useHistory } from "react-router-dom";

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const BasicBoard = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { uuid } = useParams();
  const [datGuiState, setDatGuiState] = useState({
    showMarble: false,
    posX: 0,
    posY: 0.01,
    posZ: 0,
  });

  useEffect(() => {
    connect(uuid);
  }, []);

  const endGame = () => {
    disconnect();
    history.push("/game");
    // setShowModal(false);
  };

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
      <AiOutlineMenu
        style={{
          fontSize: "25px",
          marginLeft: "97%",
          marginTop: "5px",
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal mymodal"
        overlayClassName="modal myoverlay"
        ariaHideApp={false}
      >
        <div>
          <AiOutlineClose onClick={() => setShowModal(false)} />
        </div>
        <div>
          <p className="welcome container-text" style={{ marginLeft: "7%" }}>
            Game Menu
          </p>
        </div>
        <div>
          <Button className="login button">Pause Game</Button>
        </div>
        <div>
          <Button className="login button" onClick={() => endGame()}>
            End Game
          </Button>
        </div>
      </Modal>
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
          <Board playerColor="" />
          {/* marble to test with dat gui */}
          {/* {datGuiState.showMarble && (
            <MarbleBlue
              position={[datGuiState.posX, datGuiState.posY, datGuiState.posZ]}
            />
          )} */}
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
          <MarbleGreen position={[0.52, 0.01, 0.205]} />
          {/* 2. green */}
          <MarbleGreen position={[0.52, 0.01, 0.134]} />
          {/* 3. green */}
          <MarbleGreen position={[0.52, 0.01, 0.069]} />
          {/* 4. green */}
          <MarbleGreen position={[0.52, 0.01, -0.001]} />
          {/* 1. red */}
          <MarbleRed position={[0.21, 0.01, -0.52]} />
          {/* 2. red */}
          <MarbleRed position={[0.14, 0.01, -0.52]} />
          {/* 3. red */}
          <MarbleRed position={[0.07, 0.01, -0.52]} />
          {/* 4. red */}
          <MarbleRed position={[0.001, 0.01, -0.52]} />

          {/* <KH position={[0.74, 1, 0]} />
          <QH position={[0.85, 1.03, -0.07]} />
          <JH position={[0.79, 0.79, 0]} />
          <AH position={[0.9, 0.793, -0.105]} />
          <TenH position={[0.85, 0.58, 0.01]} />
          <NineH position={[0.95, 0.55, -0.13]} /> */}
          {/* <Card url="gltf/cards/9H.gltf" position={[0.95, 0.55, -0.13]} /> */}
        </Suspense>
      </Canvas>
      {/* <DatGui data={datGuiState} onUpdate={setDatGuiState}>
        <DatFolder title="test marble" closed={false}>
          <DatBoolean path="showMarble" />
          <DatNumber path="posX" min={-0.7} max={0.7} step={0.001} />
          <DatNumber path="posY" min={-0.4} max={0.4} step={0.001} />
          <DatNumber path="posZ" min={-0.7} max={0.7} step={0.001} />
        </DatFolder>
      </DatGui> */}
    </div>
  );
};

export default BasicBoard;
