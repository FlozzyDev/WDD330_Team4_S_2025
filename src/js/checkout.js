import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

const shippingEstimate = document.getElementById("shipping-estimate");
const tax = document.getElementById("tax");
const orderTotal = document.getElementById("order-total");

loadHeaderFooter().then(() => {
    checkoutProcess.init();
});

document.getElementById("zip").addEventListener("input", function() {
  if (this.value.trim().length >= 5) {
    shippingEstimate.classList.remove("hidden");
    tax.classList.remove("hidden");
    orderTotal.classList.remove("hidden");
    checkoutProcess.calculateOrdertotal();
  }
  else {
    shippingEstimate.classList.add("hidden");
    tax.classList.add("hidden");
    orderTotal.classList.add("hidden");
    shippingEstimate.textContent = "---";
    tax.textContent = "---";
    orderTotal.textContent = "---";
  }
});

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const json = checkoutProcess.checkout(e.target);
  console.log("Payload format sent to server:", json);
  checkoutProcess.checkout(e.target);
});


