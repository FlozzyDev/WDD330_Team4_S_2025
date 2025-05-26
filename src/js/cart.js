import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const cartTotal = document.getElementById("cart-total-price");

  // if cart empty...
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    document.getElementById("product-list--cart").innerHTML = `
    <li class="empty-cart">
      <p>Your cart appears to be empty!</p>
      <button onclick="location.href='/'" class="home-button">Continue Shopping</a>
    </li>`;
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");

  // return the total price of all items
  const total = cartItems.reduce((loopTotal, item) => {
    return loopTotal + item.FinalPrice * (item.quantity || 1);
  }, 0);

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".cart-card__add").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      increaseItemQuantity(id);
      updateCartCounter();
    });
  });

  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      removeItemFromCart(id);
      updateCartCounter();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">Quantity: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <div class = "add_remove">
  <button class="cart-card__add" data-id=${item.Id}>+</button>
  <button class="cart-card__remove" data-id=${item.Id}>-</button>
  </div>
</li>`;

  return newItem;
}

export function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (cart === null) {
    cart = [];
  } else if (!Array.isArray(cart)) {
    cart = [cart];
  }
  const productIndex = cart.findIndex((item) => item.Id === product.Id);
  if (productIndex >= 0) {
    if (!cart[productIndex].quantity) {
      cart[productIndex].quantity = 1;
    }
    cart[productIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
  pulseCartIcon();
  updateCartCounter();
}

export function updateCartCounter() {
  const cartItems = getLocalStorage("so-cart");
  const cartCounter = document.getElementById("cart-counter");

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    cartCounter.textContent = 0;
    return;
  }
  let totalQuantity = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += cartItems[i].quantity || 1; // fallback default 1 per item
  }
  cartCounter.textContent = totalQuantity;
}

function pulseCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("pulse-orange");
  setTimeout(() => {
    cartIcon.classList.remove("pulse-orange");
  }, 1000);
  console.log("pulsed!");
}

function increaseItemQuantity(id) {
  let cart = getLocalStorage("so-cart");
  if (!cart) return;

  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  const itemIndex = cart.findIndex((item) => item.Id === id);

  if (itemIndex >= 0) {
    if (!cart[itemIndex].quantity) {
      cart[itemIndex].quantity = 1;
    }
    cart[itemIndex].quantity += 1;
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
  pulseCartIcon();
}

function removeItemFromCart(id) {
  let cart = getLocalStorage("so-cart");
  if (!cart) return;

  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  const itemIndex = cart.findIndex((item) => item.Id === id);

  if (itemIndex >= 0) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }

  setLocalStorage("so-cart", cart);

  renderCartContents();
  pulseCartIcon();
  updateCartCounter();
}

if (window.location.pathname.includes("/cart")) renderCartContents();
