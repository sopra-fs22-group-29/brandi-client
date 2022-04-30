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
import {
  getCard,
  positionCard1,
  positionCard2,
  positionCard3,
  positionCard4,
  positionCard5,
  positionCard6,
} from "helpers/allCards";
import { getGameByUuid } from "helpers/allGame";
import { handleError } from "helpers/api";
import { marblePosition } from "helpers/marblePosition";
import { Card } from "components/ui/cards/Card";

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
  const [players, setPlayers] = useState({});
  const [gameState, setGameState] = useState({});
  const [ballPositions, setBallPositions] = useState({});
  const playerColor = "";
  const [playerHand, setPlayerHand] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    connect(uuid);
    async function fetchGameByUuid() {
      try {
        const response = await getGameByUuid(uuid);
        setPlayers(response.data.playerStates);
        setBallPositions(response.data.boardstate.balls);
        setGameState(response.data);
      } catch (error) {
        alert(
          `Something went wrong while fetching the game: \n${handleError(
            error
          )}`
        );
      }
    }
    fetchGameByUuid();
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
      <div>{players[0]?.player.username}</div>
      <div>{players[1]?.player.username}</div>
      <div>{players[2]?.player.username}</div>
      <div>{players[3]?.player.username}</div>
      <Canvas>
        <Suspense fallback={null}>
          <Board playerColor={playerColor} />
          {/* marble to test with dat gui */}
          {/* {datGuiState.showMarble && (
            <MarbleBlue
              position={[datGuiState.posX, datGuiState.posY, datGuiState.posZ]}
            />
          )} */}
          {/* 1. blue */}
          <MarbleBlue position={marblePosition(ballPositions[4]?.position)} />
          {/* 2. blue */}
          <MarbleBlue position={marblePosition(ballPositions[5]?.position)} />
          {/* 3. blue */}
          <MarbleBlue position={marblePosition(ballPositions[6]?.position)} />
          {/* 4. blue */}
          <MarbleBlue position={marblePosition(ballPositions[7]?.position)} />
          {/* 1. yellow */}
          <MarbleYellow
            position={marblePosition(ballPositions[12]?.position)}
          />
          {/* 2. yellow */}
          <MarbleYellow
            position={marblePosition(ballPositions[13]?.position)}
          />
          {/* 3. yellow */}
          <MarbleYellow
            position={marblePosition(ballPositions[14]?.position)}
          />
          {/* 4. yellow */}
          <MarbleYellow
            position={marblePosition(ballPositions[15]?.position)}
          />
          {/* 1. green */}
          <MarbleGreen position={marblePosition(ballPositions[0]?.position)} />
          {/* 2. green */}
          <MarbleGreen position={marblePosition(ballPositions[1]?.position)} />
          {/* 3. green */}
          <MarbleGreen position={marblePosition(ballPositions[2]?.position)} />
          {/* 4. green */}
          <MarbleGreen position={marblePosition(ballPositions[3]?.position)} />
          {/* 1. red */}
          <MarbleRed position={marblePosition(ballPositions[8]?.position)} />
          {/* 2. red */}
          <MarbleRed position={marblePosition(ballPositions[9]?.position)} />
          {/* 3. red */}
          <MarbleRed position={marblePosition(ballPositions[10]?.position)} />
          {/* 4. red */}
          <MarbleRed position={marblePosition(ballPositions[11]?.position)} />
          {/* <KH playerColor={playerColor} position={positionCard1(playerColor)} />
          <QH playerColor={playerColor} position={positionCard2(playerColor)} />
          <JH playerColor={playerColor} position={positionCard3(playerColor)} />
          <AH playerColor={playerColor} position={positionCard4(playerColor)} />
          <TenH
            playerColor={playerColor}
            position={positionCard5(playerColor)}
          />
          <NineH
            playerColor={playerColor}
            position={positionCard6(playerColor)}
          /> */}
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[0]?.rank,
              players[0]?.playerHand.activeCards[0]?.suit
            )}
            playerColor={playerColor}
            position={positionCard1(playerColor)}
          />
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[1]?.rank,
              players[0]?.playerHand.activeCards[1]?.suit
            )}
            playerColor={playerColor}
            position={positionCard2(playerColor)}
          />
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[2]?.rank,
              players[0]?.playerHand.activeCards[2]?.suit
            )}
            playerColor={playerColor}
            position={positionCard3(playerColor)}
          />
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[3]?.rank,
              players[0]?.playerHand.activeCards[3]?.suit
            )}
            playerColor={playerColor}
            position={positionCard4(playerColor)}
          />
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[4]?.rank,
              players[0]?.playerHand.activeCards[4]?.suit
            )}
            playerColor={playerColor}
            position={positionCard5(playerColor)}
          />
          <Card
            url={getCard(
              players[0]?.playerHand.activeCards[5]?.rank,
              players[0]?.playerHand.activeCards[5]?.suit
            )}
            playerColor={playerColor}
            position={positionCard6(playerColor)}
          />
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
