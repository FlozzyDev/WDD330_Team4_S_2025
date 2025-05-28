import productList from "./productList.mjs";
import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCounter();
});

const category = getParam("category");
productList(".product-list", category);
