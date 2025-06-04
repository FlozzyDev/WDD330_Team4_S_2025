import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";
import { showRegistrationBanner } from "./registerBanner.js";

loadHeaderFooter().then(() => {
  updateCartCounter();
  showRegistrationBanner();
});