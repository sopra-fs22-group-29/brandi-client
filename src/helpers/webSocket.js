import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getAuthenticatedDomain } from "./getDomain";
import { findMarbleIndex, marblePosition } from "./marblePosition";

export var stompClient = null;
export var sessionId = "";
export var gameUuid = "";
export var connected = false;
var currentUser = "";

export const connect = async (gameLink, state, setState) => {
  if (connected === true) {
    disconnect();
  }
  gameUuid = gameLink;

  currentUser = JSON.parse(localStorage.getItem("user"));
  const url = getAuthenticatedDomain() + "/websocket";
  var socket = new SockJS(url);
  stompClient = over(socket);
  const authData = userAuthData();
  await stompClient.connect(
    {
      Authorization: `Basic ${authData}`,
    },
    function (frame) {
      setSessionIdFromURL(stompClient.ws._transport.url);
      if (stompClient.ws._transport.url.startsWith("http")) {
        disconnect();
        connect(gameLink, state, setState);
        return;
      }
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

          // remove cards that can not be found in the response/update
          for (let i = 0; i < 6; i++) {
            let found = false;
            for (let j = 0; j < data.activeCards.length; j++) {
              if (state.cards[i].id === data.activeCards[j].id) {
                found = true;
                break;
              }
            }
            if (!found) {
              state.cards[i].id = null;
              state.cards[i].rank = "";
              state.cards[i].suit = "";
              state.cards[i].isDealt = false;
            }
          }

          // add cards that we don't have in our hand yet
          for (let j = 0; j < data.activeCards.length; j++) {
            let found = false;
            for (let i = 0; i < 6; i++) {
              if (state.cards[i].id === data.activeCards[j].id) {
                found = true;
                break;
              }
            }
            if (!found) {
              for (let i = 0; i < 6; i++) {
                if (state.cards[i].id === null) {
                  found = true;
                  // update or initialize the card
                  state.cards[i].id = data.activeCards[j].id;
                  state.cards[i].rank = data.activeCards[j].rank;
                  state.cards[i].suit = data.activeCards[j].suit;
                  state.cards[i].isDealt = true;
                  break;
                }
              }
            }
          }

          console.log(state.cards);

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

          state.selectState = "card";
          state.circlesToDisplay = [];
          state.selectedBallId = null;

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/player/joined" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);

          // update or add the right user
          for (let i = 0; i < state.players.length; i++) {
            if (
              state.players[i].id === 0 ||
              state.players[i].id === data.player.id
            ) {
              state.players[i].id = data.player.id;
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
      stompClient.subscribe(
        "/client/nextPlayer" + "-user" + sessionId,
        function (response) {
          const data = JSON.parse(response.body);
          // update or add the right user
          for (let i = 0; i < state.players.length; i++) {
            state.players[i].isPlaying = false;
            if (state.players[i].id === data.id) {
              state.players[i].isPlaying = true;
            }
          }
          setState({ ...state });
        }
      );

      connected = true;
      // currentUser = loggedInUsername;
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
  connected = false;
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
  url = url.replace("ws://localhost:8080/websocket/", "");
  url = url.replace(
    "wss://sopra-fs22-group-29-server.herokuapp.com/websocket/",
    ""
  );

  const credentials = atob(JSON.parse(localStorage.getItem("user")).authData);
  url = url.replace(`ws://${credentials}@localhost:8080/websocket/`, "");
  url = url.replace(
    `wss://${credentials}@sopra-fs22-group-29-server.herokuapp.com/websocket/`,
    ""
  );
  url = url.replace("/websocket", "");
  url = url.replace(/^[0-9]+\//, "");
  sessionId = url;
};
