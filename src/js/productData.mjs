function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category = "tents") {
  const response = await fetch(`/json/${category}.json`);
  console.log("Trying to fetch data:", response);
  const data = await convertToJson(response);
  return data;
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
