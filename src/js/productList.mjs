import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img 
        src="public${product.Image}" 
        alt="${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">Suggested Retail: ${product.ListPrice}<br>
        <strong>Our Price:</strong> ${product.FinalPrice}<br>
        You Save: $${product.ListPrice - product.FinalPrice}</p>
    </a>
    </li>`
}

/* function renderList(data, location) {
    const place = document.getElementById(location);
    for (let i = 0; i < data.length; i++) {
        let card = productCardTemplate(data[i]);
        place.insertAdjacentHTML('beforeend', card);
    }
} */

export default async function productList(category = "tents", location = "productList", position, clear) {
    const data = await getData(category);
    renderListWithTemplate(productCardTemplate, location, data, position, clear);
}




