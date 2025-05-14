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
    });
}

function renderProductDetails() {
  const newPrice = Number(
    (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0),
  );

  document.getElementById("productBrand").textContent = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;
  document.getElementById("productImage").alt = product.NameWithoutBrand;
  document.getElementById("productMSR").textContent =
    `List Price: $${product.SuggestedRetailPrice}`;
  document.getElementById("productFinalPrice").textContent =
    `Our Price: $${product.FinalPrice}`;
  document.getElementById("productSavings").textContent =
    `You Save: $${newPrice}`;
  document.getElementById("productColorName").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}
