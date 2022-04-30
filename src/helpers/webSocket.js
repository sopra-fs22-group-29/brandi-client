import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getDomain } from "./getDomain";
import { marblePosition } from "./marblePosition";

export var stompClient = null;
export var sessionId = "";
export var gameUuid = "";
var currentUser = "";

export const connect = async (gameLink, state, setState) => {
  if (gameLink === gameUuid) return; // make sure not to connect twice

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
            state.cards[i].rank = data.activeCards[i].rank;
            state.cards[i].suit = data.activeCards[i].suit;
            state.cards[i].isDealt = true;
          }

          setState({ ...state });
        }
      );
      stompClient.subscribe(
        "/client/player/joined" + "-user" + sessionId,
        function (messageOutput) {
          // update the correct player
        }
      );

      // send initial message to notify everyone that we have successfully connected
      join(gameLink);
    }
  );
};

export const disconnect = () => {
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
    "ws://https://sopra-fs22-group-29-server.herokuapp.com/connected/",
    ""
  );
  url = url.replace("/websocket", "");
  url = url.replace(/^[0-9]+\//, "");
  sessionId = url;
};
