import { setLocalStorage, getLocalStorage} from "./utils.mjs";

export default async function productDetails(productId) {
    let data = await findProductById(productId);
    renderProductDetails(data);
}

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

function getData(category = "tents") {
    return fetch(`../public/json/${category}.json`)
      .then(convertToJson)
      .then((data) => data);
  }

async function findProductById(id) {
    const product = await getData();
    return product.find((item) => item.Id === id);
  }

function renderProductDetails(data) {
    document.getElementById("brandName").innerText = data.Brand.Name;
    document.getElementById("productNameWithoutBrand").textContent = data.NameWithoutBrand;
    document.getElementById("productImage").setAttribute('src', data.Image);
    document.getElementById("productImage").setAttribute('alt', data.Alt);
    document.getElementById("productFinalPrice").innerText = '$' + data.FinalPrice;
    document.getElementById("productColorName").innerText = data.Colors.ColorName;
    document.getElementById("productDescriptionHtmlSimple").innerHTML = data.DescriptionHtmlSimple;
    document.getElementById("addToCart").setAttribute('data-id', data.Id);
}

function addProductToCart(product) {
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
    