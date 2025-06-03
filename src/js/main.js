import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  setTimeout(updateCartCounter, 10);
  console.log('cart loaded')
});
