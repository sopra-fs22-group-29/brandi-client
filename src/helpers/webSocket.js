import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getDomain } from "./getDomain";

export var stompClient = null;
export var sessionId = "";
export var gameUuid = "";

export const connect = async (gameLink) => {
  if (gameLink === gameUuid) return; // make sure not to connect twice
  const url = getDomain() + "/websocket";
  var socket = new SockJS(url);
  stompClient = over(socket);
  const authData = userAuthData();
  console.log("gameLink------------", gameLink);
  await stompClient.connect(
    {
      Authorization: `Basic ${authData}`,
    },
    function (frame) {
      console.log("WebSocket Connected " + frame);
      setSessionIdFromURL(stompClient.ws._transport.url);

      // subscribe to all the routes that we want te be notified from
      // // (we could use /client/COLOR in order to notify only one player)
      // stompClient.subscribe("/client/move", function (messageOutput) {
      //   console.log("player moved:" + messageOutput.body);
      // });
      // stompClient.subscribe("/client/connected", function (messageOutput) {
      //   console.log("player connected: " + messageOutput);
      // });
      stompClient.subscribe(
        "/client/test" + "-user" + sessionId,
        function (messageOutput) {
          console.log("test: " + messageOutput);
        }
      );
      // stompClient.subscribe(
      //   "/client/connected/{room}",
      //   function (messageOutput) {
      //     console.log("{room}: " + messageOutput);
      //   }
      // );
      // stompClient.subscribe(
      //   "/client/connected/" + gameLink,
      //   function (messageOutput) {
      //     console.log(
      //       "***************player connected to room: " + messageOutput
      //     );
      //   }
      // );

      // send initial message to notify everyone that we have successfully connected
      // notifyConnected();
      // greet(gameLink);
      test(gameLink);
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

// export const joinRoom = (roomId) => {
//   connect(roomId);
//   console.log("-----I went here-------");
//   stompClient.subscribe("/room/" + roomId, function (greeting) {
//     alert("Yey something happened !", greeting);
//   });
// };

// below are functions to send information to the websocket server

// export const greet = (roomId) => {
//   stompClient.send("/app/websocket/" + roomId + "/connect");
// };

// export const notifyConnected = () => {
//   stompClient.send("/app/websocket/connected", {}, null);
// };

export const test = (roomId) => {
  stompClient.send("/app/websocket/" + roomId + "/test");
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
  console.log("Your current session is: " + url);
  sessionId = url;
};
