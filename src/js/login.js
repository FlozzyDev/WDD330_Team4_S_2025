import { loadHeaderFooter } from "./utils.mjs";
import { login, isTokenValid } from "./auth.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

const token = getLocalStorage("so-token");
if (isTokenValid(token)) {
  window.location = "/orders/";
  console.log("User is already logged in, token is valid");
} else {
  console.log("User is not logged in, token is invalid");
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  await login({ email, password }, "/orders/");
});
