import productList from "./productList.mjs";
import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCounter();
});

productList(".product-list", "tents");
