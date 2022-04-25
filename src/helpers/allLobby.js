import { api, handleError } from "./api";
import { userAuthData } from "./authentification";

export async function createLobby(lobbyLeaderId) {
  try {
    const requestBody = JSON.stringify({ lobbyLeaderId });
    const response = await api.post("/lobby", requestBody, {
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
    const requestBody = JSON.stringify({ lobbyLeaderId });
    await api.put("/lobby/" + uuid, requestBody, {
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
