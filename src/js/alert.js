import { renderWithTemplate } from "./utils.mjs";

export async function checkAlert() {
    let data = getAlerts(); // get json file with alert data
    if (!data.Result) { return; } // check to see if any alert is there - end function if none
    let html = alertTemplate(data); // information found so put it into a template
    renderWithTemplate(html, "main", position = "afterbegin", clear = true); // load template into page
    let stylePoint = querySelector(".alert-list");
    stylePoint.style.backgroundcolor = `${data.background}`;
    stylePoint.style.color = `${data.color}`;
}

let alertMessage = ''; // create variable outside function so others can use it
function alertTemplate(data) { // receive data from json file
  const str1 = '<section class="alert-list">'; // first item into message structure is the section where the messages display
  const str2 = '</section>'; // last item into message structure
  for (let item in data) {
      alertMessage.concat(`<p>${item}</p>`); // build the message with all items found
  }
  let builtMessage = concat(str1, alertMessage, str2); // assemble full message structure
  return builtMessage; // send it back for rendering to page
}

async function getAlerts() {
  const url = "../public/json/alerts.json";
  console.log("Fetching:", url);
  const response = await fetch(url);
  const data = await convertToJson(response);
  console.log("API data:", data);
  return data.Result;
}
