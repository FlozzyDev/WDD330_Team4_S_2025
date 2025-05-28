import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const newPrice = Number(
    (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0),
  );

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img 
        src="${product.Images.PrimaryMedium}" 
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
  const item = document.querySelector(selector);
  const heading = document.querySelector('.products h2');
  heading.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`; // Capitalize the first letter of the category
  renderListWithTemplate(productCardTemplate, item, products);
}
