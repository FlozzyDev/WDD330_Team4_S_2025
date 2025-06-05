import { convertToJson } from "./externalServices.mjs";

export async function checkAlert() {
  let data = await getAlerts(); // get json file with alert data
  if (!data || data.length === 0) {
    return;
  }

  let alertHtml = `<section class="alert-list">`;
  for (let i = 0; i < data.length; i++) {
    alertHtml += `<p style="background-color: ${data[i].background}; color: ${data[i].color};">${data[i].message}</p>`;
  }
  alertHtml += `</section>`;

  const mainElement = document.querySelector("#main");
  mainElement.insertAdjacentHTML("afterbegin", alertHtml);
  console.log(`${data[0].background} & ${data[0].color} `);
}
async function getAlerts() {
  const url = "/json/alerts.json";
  const response = await fetch(url);
  const data = await convertToJson(response);
  return data;
}
