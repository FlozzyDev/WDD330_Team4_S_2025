import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function updateCartCounter() {
  const cartItems = getLocalStorage("so-cart");
  const cartCounter = document.getElementById("cart-counter");
  let count = 0;

  if (!cartItems) return;
  else count = cartItems.length;
  cartCounter.textContent = count;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCounter();
});

export { updateCartCounter };
