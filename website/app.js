/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const apiKey = "9b39b9298db538b64692d635e2c61fce";
const button = document.getElementById("generate");

// get data method
const getData = async (url = "") => {
  const data = await fetch(url);

  try {
    const jData = await data.json();
    console.log(jData);
    return jData;
  } catch (err) {
    console.log("Error!", err);
  }
};

button.addEventListener("click", () => {
  const zip = document.querySelector("#zip").value;
  if (zip === "") {
    alert("please enter zip code");
  } else {
    getData(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey}`
    );

    getData("/data");
  }
});
