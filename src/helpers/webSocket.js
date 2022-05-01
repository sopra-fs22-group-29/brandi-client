import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getDomain } from "./getDomain";
import { findMarbleIndex, marblePosition } from "./marblePosition";

export var stompClient = null;
export var sessionId = "";
export var gameUuid = "";
var currentUser = "";

export const connect = async (gameLink, state, setState) => {
  if (gameLink === gameUuid) return; // make sure not to connect twice
  gameUuid = gameLink;

  currentUser = JSON.parse(localStorage.getItem("user"));
  const url = getDomain() + "/websocket";
  var socket = new SockJS(url);
  stompClient = over(socket);
  const authData = userAuthData();
  await stompClient.connect(
    {
      Authorization: `Basic ${authData}`,
    },
    function (frame) {
      setSessionIdFromURL(stompClient.ws._transport.url);

      // stompClient.subscribe(
      //   "/client/test" + "-user" + sessionId,
      //   function (messageOutput) {
      //     console.log("test: " + messageOutput);
      //   }
      // );
      stompClient.subscribe(
        "/client/state" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);

          for (let i = 0; i < data.playerStates.length; i++) {
            if (data.playerStates[i].player.id === currentUser.id) {
              state.playerIndex = i;
            }
            state.players[i].color = data.playerStates[i].color;
            state.players[i].id = data.playerStates[i].player.id;
            state.players[i].username = data.playerStates[i].player.username;
            state.players[i].username = data.playerStates[i].player.username;
            state.players[i].status = data.playerStates[i].status;
            state.players[i].playerStatus = data.playerStates[i].playerStatus;
            state.players[i].isPlaying = data.playerStates[i].isPlaying;
          }

          for (let i = 0; i < data.boardstate.balls.length; i++) {
            state.balls[i].id = data.boardstate.balls[i].id;
            state.balls[i].color = data.boardstate.balls[i].color;
            state.balls[i].position = data.boardstate.balls[i].position;
            state.balls[i].coordinates = marblePosition(
              state.balls[i].position
            );
          }

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/cards" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          for (let i = 0; i < data.activeCards.length; i++) {
            state.cards[i].id = data.activeCards[i].id;
            state.cards[i].rank = data.activeCards[i].rank;
            state.cards[i].suit = data.activeCards[i].suit;
            state.cards[i].isDealt = true;
          }

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/highlight/marbles" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          for (let i = 0; i < 16; i++) {
            state.balls[i].isHighlighted = false;
          }
          for (let i = 0; i < data.marbles.length; i++) {
            const ind = findMarbleIndex(state, data.marbles[i]);
            if (ind != null) {
              state.balls[ind].isHighlighted = true;
            }
          }
          state.selectedCardIndex = data.index;
          state.selectState = "ball";
          state.circlesToDisplay = [];
          state.selectedBallId = null;
          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/highlight/holes" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          state.selectedBallId = data.marbleId;
          state.circlesToDisplay = data.highlightHoles;
          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/move" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          const id = data.ballId;
          const destination = data.destinationTile;
          const cardId = data.cardId;

          // find ball with the ballId and move it
          for (let i = 0; i < 16; i++) {
            state.balls[i].isHighlighted = false;
            if (state.balls[i].id === id) {
              state.balls[i].position = destination;
              state.balls[i].coordinates = marblePosition(
                state.balls[i].position
              );
            }

            for (let i = 0; i < 16; i++) {
              state.balls[i].isHighlighted = false;
            }
          }

          // discard the played card
          for (let i = 0; i < 6; i++) {
            if (state.cards[i].id === cardId) {
              state.cards[i].id = null;
              state.cards[i].rank = "";
              state.cards[i].suit = "";
              state.cards[i].isDealt = false;
            }
          }

          state.selectState = "card";
          state.circlesToDisplay = [];
          state.selectedBallId = null;

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/player/joined" + "-user" + sessionId,
        function (response) {
          console.log("response---------", response.body);
          const data = JSON.parse(response.body);

          // update or add the right user
          for (let i = 0; i < state.players.length; i++) {
            if (
              state.players[i].id === 0 ||
              state.players[i].id === data.player.id
            ) {
              state.players[i].color = data.color;
              state.players[i].username = data.player.username;
              state.players[i].playerStatus = data.playerStatus;
              state.players[i].isPlaying = data.isPlaying;
              console.log("----status data", data.playerStatus);
              console.log("-------status", state.players[i]);
              break;
            }
          }

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/player/left" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          // update or add the right user
          for (let i = 0; i < state.players.length; i++) {
            if (state.players[i].id === data.player.id) {
              state.players[i].color = data.color;
              state.players[i].username = data.player.username;
              state.players[i].playerStatus = data.playerStatus;
              state.players[i].isPlaying = data.isPlaying;
              break;
            }
          }
          setState({ ...state });
        }
      );

      // send initial message to notify everyone that we have successfully connected
      join(gameLink);
    }
  );
};

export const disconnect = () => {
  leave();
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};

// this will close the connection and unsubscribe all subscriptions
// (this is sadly not called when someone presses the back button in the browser)
window.onbeforeunload = function () {
  console.log("disconnecting websocket...");
  disconnect();
};

export const join = (roomId) => {
  stompClient.send("/app/websocket/" + roomId + "/join");
};

export const leave = () => {
  stompClient.send("/app/websocket/" + gameUuid + "/leave");
};

export const selectCard = (index, rank, suit) => {
  stompClient.send(
    "/app/websocket/" + gameUuid + "/select/card",
    {},
    JSON.stringify({
      index: index,
      rank: rank,
      suit: suit,
    })
  );
};

export const selectMarble = (cardIndex, rank, suit, marbleId) => {
  stompClient.send(
    "/app/websocket/" + gameUuid + "/select/marble",
    {},
    JSON.stringify({
      cardIndex: cardIndex,
      rank: rank,
      suit: suit,
      marbleId: marbleId,
    })
  );
};

export const moveMarble = (card, ballId, destinationTile) => {
  stompClient.send(
    "/app/websocket/" + gameUuid + "/move",
    {},
    JSON.stringify({
      playedCard: card,
      ballId: ballId,
      destinationTile: destinationTile,
    })
  );
};

// export const executeExampleMove = () => {
//   stompClient.send(
//     "/app/websocket/move",
//     {},
//     JSON.stringify({
//       ballId: 1,
//       destinationTile: 22,
//       card: {
//         id: 333,
//         rank: "SEVEN",
//         suit: "DIAMOND",
//       },
//     })
//   );
// };

const setSessionIdFromURL = (url) => {
  console.log(url);
  url = url.replace("ws://localhost:8080/websocket/", "");
  url = url.replace(
    "wss://sopra-fs22-group-29-server.herokuapp.com/websocket/",
    ""
  );
  url = url.replace("/websocket", "");
  url = url.replace(/^[0-9]+\//, "");
  sessionId = url;
};
