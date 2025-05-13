import productList from "./productList.mjs";
import { updateCartCounter } from "./cart";

productList(".product-list", "tents");

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});
