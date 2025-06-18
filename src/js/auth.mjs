import { loginRequest } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

// 1 - login
export async function login(user, redirect = "/") {
  const loginMessage = document.getElementById("login-message");
  try {
    const token = await loginRequest(user);
    if (token) {
      setLocalStorage(tokenKey, token);
      loginMessage.textContent = "Login successful";
      loginMessage.className = "success";
      window.location = redirect;
    } else {
      loginMessage.textContent = "Login failed, please try again";
      loginMessage.className = "error";
      console.log("Failed to login");
    }
  } catch (err) {
    loginMessage.textContent = "Login failed, please try again";
    loginMessage.className = "error";
    console.log(err.message);
  }
}

// 2 - isTokenValid

export function isTokenValid(token) {
  if (!token || typeof token !== "string") {
    console.log("No token found or token is invalid");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    let currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token has expired.");
      return false;
    } else {
      console.log("Token is valid");
      return true;
    }
  } catch (error) {
    console.log("Invalid token format or token is invalid");
    return false;
  }
}

// 3 - checkLogin
export function checkLogin() {
  const token = getLocalStorage(tokenKey);
  const valid = isTokenValid(token);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    window.location = `/login/index.html?redirect=${window.location.pathname}`;
  }
  return token;
}
