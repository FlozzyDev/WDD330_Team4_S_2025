import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCounter();
});
