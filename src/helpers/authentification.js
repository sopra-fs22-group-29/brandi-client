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

export async function register(registerUser, redirect) {
  const requestBody = JSON.stringify(registerUser);
  try {
    await api.post("/register", requestBody);
    redirect();
  } catch (error) {
    localStorage.removeItem("user");
    alert(
      `Something went wrong during the registration: \n${handleError(error)}`
    );
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
    return null;
  }
}

export async function updateUser(userId, birthDate) {
  try {
    const requestBody = JSON.stringify({ birthDate: birthDate });
    const response = await api.post("/users/" + userId, requestBody, {
      headers: { Authorization: `Basic ${userAuthData()}` },
    });
    return response;
  } catch (error) {
    alert(
      `Something went wrong while updating the user: \n${handleError(error)}`
    );
    return null;
  }
}
