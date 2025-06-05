import productList from "./productList.mjs";
import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { checkAlert } from "./alert.js";

loadHeaderFooter().then(() => {
  updateCartCounter();
});

const category = getParam("category");
productList(".product-list", category);

checkAlert(); // call function to see if any alerts are present
