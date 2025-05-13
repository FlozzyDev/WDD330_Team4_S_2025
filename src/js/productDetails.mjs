import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { addProductToCart } from "./cart";

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
