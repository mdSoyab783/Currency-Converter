const BASE_URL = "https://api.frankfurter.dev/v2/rate";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.value = currCode;
    newOption.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let flagImgTag = element.parentElement.querySelector("img");

  flagImgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;

  let response = await fetch(URL);

  let data = await response.json();

  let rate = data.rate;
  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});