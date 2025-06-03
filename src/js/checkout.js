import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter().then(() => {
    checkoutProcess.init();
});

document.getElementById("zip").addEventListener("input", function() {
  if (this.value.trim().length >= 5) {
    checkoutProcess.calculateOrdertotal();
  }
});


