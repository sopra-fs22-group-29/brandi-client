import { Canvas } from "@react-three/fiber";
import { Board } from "components/ui/Board";
import { Button } from "components/ui/Button";
import { Card } from "components/ui/cards/Card";
import { CircleToClick } from "components/ui/CircleToClick";
import { MarbleGeneral } from "components/ui/marbles/MarbleGeneral";
import { getCard, positionCard } from "helpers/allCards";
import { marblePosition } from "helpers/marblePosition";
import { connect, disconnect } from "helpers/webSocket";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";
import { useHistory, useParams } from "react-router-dom";
import "styles/ui/Modal.scss";

const defaultBall = {
  id: null,
  position: 1000,
  coordinates: marblePosition(1000),
  color: "GREEN",
  isHighlighted: false,
};

const defaultPlayer = {
  color: "GREEN",
  username: "",
  id: 0,
  status: null,
};

const defaultCard = {
  rank: "",
  suit: "",
  isDealt: false,
};

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const BasicBoard = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { uuid } = useParams();
  // const [datGuiState, setDatGuiState] = useState({
  //   showMarble: false,
  //   posX: 0,
  //   posY: 0.01,
  //   posZ: 0,
  // });
  const [state, setState] = useState({
    selectState: "card",
    playerIndex: 0,
    players: [
      { ...defaultPlayer },
      { ...defaultPlayer },
      { ...defaultPlayer },
      { ...defaultPlayer },
    ],
    cards: [
      { ...defaultCard },
      { ...defaultCard },
      { ...defaultCard },
      { ...defaultCard },
      { ...defaultCard },
      { ...defaultCard },
    ],
    balls: [
      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },

      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },

      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },

      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },
      { ...defaultBall },
    ],
  });

  useEffect(() => {
    connect(uuid, state, setState);
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
          position: "absolute",
          zIndex: 2,
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
      <div style={{ position: "absolute" }}>
        <div>{state.players[0].username}</div>
        <div>{state.players[1].username}</div>
        <div>{state.players[2].username}</div>
        <div>{state.players[3].username}</div>
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <Board playerColor={state.players[state.playerIndex].color} />
          <CircleToClick position={[0.067, 0.011, 0.35]} />
          {/* marble to test with dat gui */}
          {/* {datGuiState.showMarble && (
            <MarbleBlue
              position={[datGuiState.posX, datGuiState.posY, datGuiState.posZ]}
            />
          )} */}
          {Array(16)
            .fill(null)
            .map((_, i) => {
              return (
                <MarbleGeneral
                  key={i}
                  color={state.balls[i].color}
                  position={state.balls[i].coordinates}
                />
              );
            })}

          {Array(6)
            .fill(null)
            .map((_, i) => {
              return (
                state.cards[i].isDealt && (
                  <Card
                    key={i}
                    url={getCard(state.cards[i].rank, state.cards[i].suit)}
                    playerColor={state.players[state.playerIndex].color}
                    position={positionCard(
                      state.players[state.playerIndex].color,
                      i + 1
                    )}
                  />
                )
              );
            })}
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
