import { Html, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BaseContainer from "components/ui/BaseContainer";
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
import { BiUserCircle } from "react-icons/bi";
import Modal from "react-modal/lib/components/Modal";
import { useHistory, useParams } from "react-router-dom";
import "styles/ui/Modal.scss";
import "styles/views/Board.scss";

const defaultBall = {
  id: null,
  position: 1000,
  coordinates: marblePosition(1000),
  color: "GREEN",
  isHighlighted: false,
};

const defaultPlayer = {
  color: "RED",
  username: "",
  id: 0,
  status: null,
  isPlaying: false,
  playerStatus: false,
};

const defaultCard = {
  id: null,
  rank: "",
  suit: "",
  isDealt: false,
};

// drop .gltf file at https://gltf.pmnd.rs/, to be able to access every single component
const BasicBoard = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [endGameModal, setEndGameModal] = useState(false);
  const { uuid } = useParams();
  // const [datGuiState, setDatGuiState] = useState({
  //   showMarble: false,
  //   posX: 0,
  //   posY: 0.01,
  //   posZ: 0,
  // });
  const [state, setState] = useState({
    playerIndex: 0,
    selectState: "card",
    selectedCardIndex: null,
    selectedBallId: null,
    circlesToDisplay: [],
    gameEnded: false,
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
    console.log("basic board rendering");
    connect(uuid, state, setState);
  }, []);

  const endGame = () => {
    disconnect();
    history.push("/game");
    // setShowModal(false);
  };
  console.log(state.players.every((player) => player.playerStatus));

  return (
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
          <Button
            className="login button"
            onClick={() => setEndGameModal(true)}
          >
            End Game
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={endGameModal}
        onRequestClose={() => setEndGameModal(false)}
        className="modal mymodal"
        overlayClassName="modal myoverlay"
        ariaHideApp={false}
      >
        <div style={{ margin: "15px" }}>
          <p className="welcome container-text" style={{ marginTop: "0" }}>
            End the game?
          </p>
          <p>
            The game will be ended for everyone. <br /> You will be redirected
            to the home screen
          </p>
          <Button
            className="board button"
            style={{ marginRight: "70px" }}
            onClick={() => setEndGameModal(false)}
          >
            Cancel
          </Button>
          <Button className="board button" onClick={() => endGame()}>
            Yes
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={state.gameEnded}
        className="modal mymodal"
        overlayClassName="modal myoverlay"
        ariaHideApp={false}
      >
        <div>
          <p className="welcome container-text" style={{ marginTop: "0" }}>
            Someone Ended the Game!
          </p>
          <p style={{ marginLeft: "95px" }}>
            You will be redirected to your home screen.
          </p>
          <Button
            className="board button"
            style={{ marginLeft: "210px" }}
            onClick={() => endGame(false)}
          >
            OK !
          </Button>
        </div>
      </Modal>

      <div style={{ position: "absolute", margin: "20px" }}>
        {Array(4)
          .fill(null)
          .map((_, i) => {
            return (
              <div style={{ display: "flex" }} key={i}>
                <BiUserCircle
                  style={{
                    fontSize: "25px",
                    color: `${state.players[i].color}`,
                    marginRight: "10px",
                  }}
                />
                {`${state.playerIndex === i ? "You: " : ""}${
                  state.players[i].username ?? ""
                }${
                  state.players[i].playerStatus === true ? "" : " (offline) "
                }`}
              </div>
            );
          })}
      </div>
      <div>
        <BaseContainer className="board container">
          {state.players.every((player) => player.playerStatus)
            ? state.players[state.playerIndex].isPlaying === true
              ? "Your turn!"
              : `Waiting for ${
                  state.players.find((player) => player.isPlaying === true)
                    ?.username
                } to play...`
            : "Waiting for players to join..."}
        </BaseContainer>
      </div>

      <Canvas>
        <Suspense
          fallback={
            <Html>
              <Loader />
            </Html>
          }
        >
          <Board playerColor={state.players[state.playerIndex].color} />
          {/* marble to test with dat gui */}
          {/* {datGuiState.showMarble && (
            <MarbleBlue
              position={[datGuiState.posX, datGuiState.posY, datGuiState.posZ]}
            />
          )} */}
          {/* circlesToDisplay */}
          {state.circlesToDisplay.map((position) => {
            return (
              <CircleToClick
                key={position}
                position={[
                  marblePosition(position)[0],
                  0.011,
                  marblePosition(position)[2],
                ]}
                destinationTile={position}
                selectedBallId={state.selectedBallId}
                card={{
                  id: state.cards[state.selectedCardIndex].id,
                  rank: state.cards[state.selectedCardIndex].rank,
                  suit: state.cards[state.selectedCardIndex].suit,
                }}
              />
            );
          })}

          {Array(16)
            .fill(null)
            .map((_, i) => {
              return (
                <MarbleGeneral
                  key={i}
                  color={state.balls[i].color}
                  position={state.balls[i].coordinates}
                  ballId={state.balls[i].id}
                  isHighlighted={state.balls[i].isHighlighted}
                  selectState={state.selectState}
                  selectedCardIndex={state.selectedCardIndex}
                  rank={
                    state.selectedCardIndex !== null
                      ? state.cards[state.selectedCardIndex].rank
                      : undefined
                  }
                  suit={
                    state.selectedCardIndex !== null
                      ? state.cards[state.selectedCardIndex].suit
                      : undefined
                  }
                  selectedBallId={state.selectedBallId}
                  onChangeSelectedBallId={(selected) => {
                    state.selectedBallId = selected;
                    setState({ ...state });
                  }}
                  onChangeSelectState={(select) => {
                    state.selectState = select;
                    setState({ ...state });
                  }}
                  onChangeCirclesToDisplay={(select) => {
                    state.circlesToDisplay = select;
                    setState({ ...state });
                  }}
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
                    cardIndex={i}
                    selectedIndex={state.selectedCardIndex}
                    state={state}
                    setState={setState}
                    url={getCard(state.cards[i].rank, state.cards[i].suit)}
                    rank={state.cards[i].rank}
                    suit={state.cards[i].suit}
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
