import User from "models/User";
import { api, handleError } from "./api";

export function userAuthData() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.authData;
}

export function isCurrentUser(user) {
  const current = JSON.parse(localStorage.getItem("user"));
  return current.username === user.username;
}

export async function login(username, password, redirect) {
  const requestBody = JSON.stringify({ username });
  const authData = window.btoa(username + ":" + password);
  try {
    const response = await api.post("/login", requestBody, {
      headers: { Authorization: `Basic ${authData}` },
    });
    const user = new User(response.data);

    if (user) {
      user.authData = authData;
      localStorage.setItem("user", JSON.stringify(user));
    }
    redirect();
  } catch (error) {
    localStorage.removeItem("user");
    alert(`Something went wrong during the login: \n${handleError(error)}`);
  }
}

export async function logout(redirect) {
  localStorage.removeItem("user");
  try {
    await api.post("/logout");
    redirect();
  } catch (error) {
    alert(`Something went wrong while logging out: \n${handleError(error)}`);
  }
}

export async function register(username, password, redirect) {
  const requestBody = JSON.stringify({ username, password });
  const authData = window.btoa(username + ":" + password);
  try {
    const response = await api.post("/register", requestBody);
    const user = new User(response.data);

    if (user) {
      user.authData = authData;
      localStorage.setItem("user", JSON.stringify(user));
    }
    redirect();
  } catch (error) {
    localStorage.removeItem("user");
    alert(
      `Something went wrong during the registration: \n${handleError(error)}`
    );
    window.location.pathname = "/welcome";
  }
}

export async function getUsers() {
  try {
    const response = await api.get("/users", {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response;
  } catch (error) {
    localStorage.removeItem("user");
    alert(`Something went wrong while fetching users: \n${handleError(error)}`);
    window.location.pathname = "/welcome";
    return null;
  }
}

export async function getUser(userId) {
  try {
    const response = await api.get("/users/" + userId, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response;
  } catch (error) {
    localStorage.removeItem("user");
    alert(`Something went wrong while fetching user: \n${handleError(error)}`);
    window.location.pathname = "/welcome";
    return null;
  }
}

export async function getGames() {
  try {
    const response = await api.get("/game", {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response.data === null ? [] : response.data;
  } catch (error) {
    localStorage.removeItem("user");
    alert(`Something went wrong while fetching games: \n${handleError(error)}`);
    window.location.pathname = "/welcome";
    return [];
  }
}

export async function updateUser(username, password, id, authData) {
  try {
    const requestBody = JSON.stringify({
      username: username,
      password: password,
    });
    const response = await api.put("/users/" + id, requestBody, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    const decoded = window.atob(authData);
    const oldPassword = decoded.split(":").pop();
    const user = new User(response.data);
    localStorage.removeItem("user");
    if (password !== "") {
      const authData = window.btoa(username + ":" + password);
      user.authData = authData;
    } else {
      const authData2 = window.btoa(username + ":" + oldPassword);
      user.authData = authData2;
    }
    localStorage.setItem("user", JSON.stringify(user));

    return response;
  } catch (error) {
    alert(
      `Something went wrong while updating the user: \n${handleError(error)}`
    );
    window.location.pathname = "/welcome";
    return null;
  }
}
