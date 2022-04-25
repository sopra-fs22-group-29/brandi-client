import * as SockJS from "sockjs-client";
import { over } from "stompjs";
import { userAuthData } from "./authentification";
import { getDomain } from "./getDomain";

var stompClient = null;

export const connect = async () => {
  const url = getDomain() + "/connected";
  var socket = new SockJS(url);
  stompClient = over(socket);
  const authData = userAuthData();
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

      // send initial message to notify everyone that we have successfully connected
      notifyConnected();
    }
  );
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};

// below are functions to send information to the websocket server

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
