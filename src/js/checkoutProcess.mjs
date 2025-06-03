import { getLocalStorage, formDatatoJSON } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function packageItems(items) {
  const simpleItems = items.map((item) => {
    return {
        id: item.Id,
        price: item.FinalPrice,
        quantity: item.quantity,
        name: item.Name,
    }
  });
  return simpleItems;
}

const checkoutProcess = {
    key: "so-cart", // hard coded to so-cart
    outputSelector: "#order-summary", // hard coded to order-summary
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function () {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
        this.calculateOrdertotal();
    },

// find the total price and total quantity of items
  calculateItemSummary: function() {
    let total = 0;
    let count = 0;
    this.list.forEach(item => {
      total += item.FinalPrice * item.quantity;
      count += item.quantity;
    });
    this.itemTotal = total;
    document.getElementById("item-count").textContent = `${count}`;
    document.getElementById("item-subtotal").textContent = `$${total.toFixed(2)}`;
  },

// add the shipping and tax (tax is 6% / shipping is $10 + $2 per item)
  calculateOrdertotal: function() {
    let count = 0;
    this.list.forEach(item => count += item.quantity);
    this.shipping = count > 0 ? 10 + (count - 1) * 2 : 0;
    this.tax = +(this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = +(this.itemTotal + this.shipping + this.tax).toFixed(2);
    this.displayOrderTotals();
  },

// format display the totals
  displayOrderTotals: function() {
    document.getElementById("shipping-estimate").textContent = `$${this.shipping.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${this.tax.toFixed(2)}`;
    document.getElementById("order-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  },

  checkout: async function (form) {
    const json = formDatatoJSON(form);
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    
    try {
        const res = await checkout(json);
        if (res.orderId) {
            console.log("Order placed successfully: ", res.orderId);
            
        } else {
            console.log("Order failed");
            console.log(res);

        }
    } catch (error) {
        console.log(error);
    }
  }
}
export default checkoutProcess;