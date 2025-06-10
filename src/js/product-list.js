import productList from "./productList.mjs";
import { updateCartCounter } from "./cart.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { checkAlert } from "./alert.js";

const category = getParam("category");
loadHeaderFooter().then(() => {
  updateCartCounter();

  const sortDropdown = document.getElementById("filter-dropdown");
  productList(".product-list", category);

  sortDropdown.addEventListener("change", function () {
    const sortOrder = this.value;
    productList(".product-list", category, sortOrder);
    this.blur();
  });
});
checkAlert(); // call function to see if any alerts are present
