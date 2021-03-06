import { api, handleError } from "./api";
import { userAuthData } from "./authentification";

export async function createLobby(id, name) {
  try {
    const requestBody = JSON.stringify({ id, name });
    const response = await api.post("/game", requestBody, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response;
  } catch (error) {
    alert(
      `Something went wrong while creating a lobby: \n${handleError(error)}`
    );
    return null;
  }
}

export async function joinLobby(uuid, lobbyLeaderId, redirect) {
  try {
    const requestBody = JSON.stringify({ id: uuid });
    await api.put("/game/" + uuid, requestBody, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    redirect();
  } catch (error) {
    alert(
      `Something went wrong while joining the lobby: \n${handleError(error)}`
    );
    return null;
  }
}

export async function getGameByUuid(uuid) {
  try {
    const response = await api.get("/game/" + uuid, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response;
  } catch (error) {
    alert(
      `Something went wrong while getting the game: \n${handleError(error)}`
    );
    return null;
  }
}
