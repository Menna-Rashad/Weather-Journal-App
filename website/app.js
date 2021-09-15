/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// months are 0 indexed
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

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

// post Data method

const postData = async (url = "", bodyData = {}) => {
  const data = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  try {
    const jData = await data.json();
    console.log(jData);
    return jData;
  } catch (err) {
    console.log("Error!", err);
  }
};

// event listener to the generate button

button.addEventListener("click", () => {
  const zip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  if (
    zip === "" ||
    feelings === "" ||
    !document.querySelector("input[name='unit']:checked")
  ) {
    alert("please enter zip code, your feeling and choose a unit");
  } else {
    // get data frop weather api, post it in local server then get wanted data and change the ui
    // from the open weather api
    const unit = document.querySelector("input[name='unit']:checked").value;
    getData(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey}&units=${unit}`
    )
      .then((data) => {
        postData("/data", {
          date: newDate,
          temp: data.main.temp,
          content: feelings,
        });
        //console.log("temp is", data.main.temp);
      })
      .then(async () => {
        // GET Route II: Client Side
        const finalData = await getData("/data");
        console.log(finalData);
        document.getElementById("date").innerHTML = `Date: ${finalData.date}`;
        document.getElementById("temp").innerHTML = `Temp: ${finalData.temp}`;
        document.getElementById(
          "content"
        ).innerHTML = `Content: ${finalData.content}`;
      });
  }
});
