import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

export function showRegistrationBanner() {

function showRegistrationBanner() {
  // Create banner container
   if (document.querySelector(".register-banner")) return;

  const banner = document.createElement("div");
  banner.className = "register-banner";
  banner.innerHTML = `
    <span>Join us today! <strong>Register now</strong> to get exclusive offers and updates.</span>
    <a href="/register.html" class="register-link">Register</a>
    <button class="close-banner" aria-label="Close">&times;</button>
  `;
  banner.querySelector(".close-banner").onclick = () => banner.remove();
  document.body.prepend(banner);
}

loadHeaderFooter().then(() => {
  updateCartCounter();
  showRegistrationBanner();
}); 
}