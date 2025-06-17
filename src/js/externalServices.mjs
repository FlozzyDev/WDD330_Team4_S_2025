const baseURL = import.meta.env.VITE_SERVER_URL;

export async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    const responseString = JSON.stringify(response);
    throw { name: "serviceError", message: `Invalid Entry: ${responseString}` };
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
  const url =
    import.meta.env.VITE_CHECKOUT_URL ||
    "http://server-nodejs.cit.byui.edu:3000/checkout";
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

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  if (response.accessToken) {
    return response.accessToken;
  } else {
    console.log("Failed to login");
    return null;
  }
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  if (response) {
    console.log("orders:", response);
    return response;
  } else {
    console.log("No orders found");
    return [];
  }
}
