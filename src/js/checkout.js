import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

const shippingEstimate = document.getElementById("shipping-estimate");
const tax = document.getElementById("tax");
const orderTotal = document.getElementById("cart-order-total");

loadHeaderFooter().then(() => {
  checkoutProcess.init();
});

document.getElementById("zip").addEventListener("input", function () {
  if (this.value.trim().length >= 5) {
    shippingEstimate.classList.remove("hidden");
    tax.classList.remove("hidden");
    orderTotal.classList.remove("hidden");
    checkoutProcess.calculateOrdertotal();
  } else {
    shippingEstimate.classList.add("hidden");
    tax.classList.add("hidden");
    orderTotal.classList.add("hidden");
    shippingEstimate.textContent = "---";
    tax.textContent = "---";
    orderTotal.textContent = "---";
  }
});

document
  .getElementById("checkout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await checkoutProcess.checkout(e.target);
    } catch (error) {
      console.log(`Checkout failed:`, error);
    }
  });
