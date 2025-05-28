const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category = "tents") {
  const url = baseURL + `products/search/${category}`;
  console.log("Fetching:", url);
  const response = await fetch(url);
  const data = await convertToJson(response);
  console.log("API data:", data);
  return data.Result;
}

export async function findProductById(id) {
  const url = baseURL + `product/${id}`;
  console.log("Fetching:", url);
  const response = await fetch(url);
  const data = await convertToJson(response);
  console.log("API data:", data);
  return data.Result;
}
