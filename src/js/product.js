import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
//import { setLocalStorage, getLocalStorage} from "./utils.mjs";
//import { findProductById } from "./productData.mjs";

const productId = getParam('product');
productDetails(productId);


//console.log(findProductById(productId));

/* function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");
  
  if (cart === null) {
  cart = [];
  }
  else if (!Array.isArray(cart)) {
  cart = [cart];
  }

  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
*/