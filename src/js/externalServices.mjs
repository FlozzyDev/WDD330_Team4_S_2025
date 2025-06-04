const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category = "tents") {
  const url = baseURL + `products/search/${category}`;
  console.log("Fetching:", url);
  const response = await fetch(url);
  const data = await convertToJson(response);
  console.log("API data:", data);
  return data.Result;
}

export async function getProductById(id) {
  const url = baseURL + `product/${id}`;
  console.log("Fetching:", url);
  const response = await fetch(url);
  const data = await convertToJson(response);
  console.log("API data:", data);
  return data.Result;
}

export async function checkout(json) {
  const url = import.meta.env.VITE_CHECKOUT_URL || "http://server-nodejs.cit.byui.edu:3000/checkout";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  };
  console.log("Sending:", json);
  const response = await fetch(url, options);
  return convertToJson(response);
}
