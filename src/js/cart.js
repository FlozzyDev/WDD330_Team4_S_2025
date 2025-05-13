import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    // if cart empty...
    document.getElementById("product-list--cart").innerHTML = `
    <li class="empty-cart">
      <p>Your cart appears to be empty!</p>
      <button onclick="location.href='/'" class="home-button">Continue Shopping</a>
    </li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");

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
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-id=${item.Id}>X</button>
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
  cart.push(product);
  setLocalStorage("so-cart", cart);
  pulseCartIcon();
  updateCartCounter();
}

export function updateCartCounter() {
  const cartItems = getLocalStorage("so-cart");
  const cartCounter = document.getElementById("cart-counter");
  let count = 0;

  if (cartItems) {
    cartCounter.textContent = Array.isArray(cartItems) ? cartItems.length : 0; // need to update even if cart = 0
  }
}

function pulseCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("pulse-orange");
  setTimeout(() => {
    cartIcon.classList.remove("pulse-orange");
  }, 1000);
  console.log("pulsed!");
}

function removeItemFromCart(id) {
  let cart = getLocalStorage("so-cart");
  if (!cart) return;
  const itemIndex = cart.findIndex((item) => item.Id === id);

  if (itemIndex >= 0) {
    cart.splice(itemIndex, 1);
  }

  setLocalStorage("so-cart", cart);

  renderCartContents();
  pulseCartIcon();
  updateCartCounter();
}

if (window.location.pathname.includes("/cart")) renderCartContents();
