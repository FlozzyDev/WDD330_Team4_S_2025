import { updateCartCounter } from "./main.js";
import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function getProductDetails(productId) {
  product = await findProductById(productId);
  console.log(`Getting ${productId}`);
  renderProductDetails();

  document
    .getElementById("addToCart")
    .addEventListener("click", function (event) {
      addProductToCart(product);
      console.log(`product ${productId} successfully added`);
      console.log("Cart contents:", JSON.stringify(getLocalStorage("so-cart")));
    });
}

function renderProductDetails() {
  document.getElementById("productBrand").textContent = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;
  document.getElementById("productImage").alt = product.NameWithoutBrand;
  document.getElementById("productFinalPrice").textContent =
    `${product.FinalPrice}`;
  document.getElementById("productColorName").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (cart === null) {
    cart = [];
  } else if (!Array.isArray(cart)) {
    cart = [cart];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
  pulseCartIcon();
  updateCartCounter();
}

function pulseCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("pulse-orange");
  setTimeout(() => {
    cartIcon.classList.remove("pulse-orange");
  }, 1000);
  console.log("pulsed!");
}
