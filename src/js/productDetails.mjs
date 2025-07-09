import { getProductById, getProductsByCategory } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { addProductToCart } from "./cart";

let product = {};

export default async function getProductDetails(productId) {
  product = await getProductById(productId);
  console.log(`Getting ${productId}`);
  renderProductDetails();
  
  // Load and display recommended products
  await loadRecommendedProducts();

  document
    .getElementById("addToCart")
    .addEventListener("click", function (event) {
      addProductToCart(product);
      console.log(`product ${productId} successfully added`);
    });
}

function renderProductDetails() {
  const newPrice = Number(
    (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0),
  );

  document.getElementById("productBrand").textContent = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Images.PrimaryLarge;
  document.getElementById("productImage").alt = product.NameWithoutBrand;
  document.getElementById("productMSR").textContent =
    `List Price: $${product.SuggestedRetailPrice}`;
  document.getElementById("productFinalPrice").textContent =
    `Our Price: $${product.FinalPrice}`;
  document.getElementById("productSavings").textContent =
    `You Save: $${newPrice}`;
  document.getElementById("productColorName").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

async function loadRecommendedProducts() {
  try {
    const currentCategory = getProductCategory(product);
    const products = await getProductsByCategory(currentCategory);
    
    const filteredProducts = products.filter(p => p.Id !== product.Id);
    const recommendedProducts = shuffleArray(filteredProducts).slice(0, 3);
    
    renderRecommendedProducts(recommendedProducts);
  } catch (error) {
    console.error("Error loading recommended products:", error);
  }
}

function getProductCategory(product) {
  const name = product.NameWithoutBrand.toLowerCase();
  if (name.includes("tent")) return "tents";
  if (name.includes("sleeping") || name.includes("bag")) return "sleeping-bags";
  if (name.includes("backpack") || name.includes("pack")) return "backpacks";
  return "tents";
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderRecommendedProducts(products) {
  const recommendedSection = document.getElementById("recommended-products");
  if (!recommendedSection || products.length === 0) return;
  
  const productsHTML = products.map(product => {
    const newPrice = Number(
      (product.SuggestedRetailPrice - product.FinalPrice).toFixed(0),
    );
    
    return `
      <div class="recommended-product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
          <img 
            src="${product.Images.PrimaryMedium}" 
            alt="${product.Name}"
            class="recommended-product-image"
          />
          <div class="recommended-product-info">
            <h4 class="recommended-product-brand">${product.Brand.Name}</h4>
            <h3 class="recommended-product-name">${product.NameWithoutBrand}</h3>
            <p class="recommended-product-price">
              <span class="original-price">$${product.SuggestedRetailPrice}</span>
              <span class="final-price">$${product.FinalPrice}</span>
              <span class="savings">Save $${newPrice}</span>
            </p>
          </div>
        </a>
      </div>
    `;
  }).join('');
  
  recommendedSection.innerHTML = `
    <h2 class="recommended-title">Recommended Products</h2>
    <div class="recommended-products-grid">
      ${productsHTML}
    </div>
  `;
}
