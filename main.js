async function country() {
  const frist_api = `https://api.exchangerate-api.com/v4/latest/USD`;

  try {
    const frist_response = await fetch(frist_api);
    const frist_data = await frist_response.json();

    let country = frist_data.rates;

    for (let key in country) {
      let select = document.getElementById("from_currency");

      let newCurrency = document.createElement("option");

      newCurrency.value = key;
      newCurrency.text = key;
      select.appendChild(newCurrency);

      let select2 = document.getElementById("to_currency");

      let newCurrency2 = document.createElement("option");

      newCurrency2.value = key;
      newCurrency2.text = key;
      select2.appendChild(newCurrency2);
    }
  } catch (error) {
    console.log("Error", error);
  }
}
country();

async function convert() {
  const from = document.getElementById("from_currency").value;
  const to = document.getElementById("to_currency").value;
  const amount = parseFloat(document.getElementById("Amount").value);

  if (!from || !to || isNaN(amount)) {
    alert("Please select currencies and enter a valid amount.");
    return;
  }

  const api = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(api);
    const data = await response.json();

    const rate = data.rates[to];
    const result = rate * amount;

    let result_amount = "";
    result_amount += `${amount}: ${from}`;
    document.getElementById("Amount").value = result_amount;

    document.getElementById("result").innerText = " loading...";
    setTimeout(() => {
      document.getElementById(
        "result"
      ).innerText = `Converted Amount: ${result} ${to}`;
    }, 1000);

  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "Conversion failed.";
  }
}

function input_remove() {
  let input = (document.getElementById("Amount").value = "");
}
