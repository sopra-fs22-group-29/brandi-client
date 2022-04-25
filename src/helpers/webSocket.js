import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getDomain } from "./getDomain";

var stompClient = null;

export const connect = async (gameLink) => {
  const url = getDomain() + "/connected";
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

      // subscribe to all the routes that we want te be notified from
      // (we could use /client/COLOR in order to notify only one player)
      stompClient.subscribe("/client/move", function (messageOutput) {
        console.log("player moved:" + messageOutput.body);
      });
      stompClient.subscribe("/client/connected", function (messageOutput) {
        console.log("player connected: " + messageOutput);
      });
      stompClient.subscribe(
        "/client/connected/" + gameLink,
        function (messageOutput) {
          console.log("player connected to room: " + messageOutput);
        }
      );

      // send initial message to notify everyone that we have successfully connected
      notifyConnected();
      greet(gameLink);
    }
  );
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};

export const joinRoom = (roomId) => {
  connect();
  console.log("-----I went here-------");
  stompClient.subscribe("/room/" + roomId, function (greeting) {
    alert("Yey something happened !", greeting);
  });
};

// below are functions to send information to the websocket server

export const greet = (roomId) => {
  stompClient.send("/client/connected/" + roomId);
};

export const notifyConnected = () => {
  stompClient.send("/app/connected", {}, null);
};

export const executeExampleMove = () => {
  stompClient.send(
    "/app/move",
    {},
    JSON.stringify({
      ballId: 1,
      destinationTile: 22,
      card: {
        id: 333,
        rank: "SEVEN",
        suit: "DIAMOND",
      },
    })
  );
};
