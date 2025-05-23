import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const newPrice = Number(
    (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0),
  );

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img 
        src="${product.Image}" 
        alt="${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">Suggested Retail: $${product.SuggestedRetailPrice}<br>
        <strong>Our Price:</strong> $${product.FinalPrice}<br>
        You Save: $${newPrice}</p>
    </a>
    </li>`;
}

export default async function productList(selector, category) {
  const products = await getData(category);
  const highlightedProducts = highlightProducts(products);
  const item = document.querySelector(selector);
  renderListWithTemplate(productCardTemplate, item, highlightedProducts);
}

function highlightProducts(products) {
  const targetProducts = ["880RR", "985RF", "985PR", "344YJ"];
  return products.filter((product) => targetProducts.includes(product.Id));
}
