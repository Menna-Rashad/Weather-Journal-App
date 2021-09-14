// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

// GET Route I: Server Side

app.get("/data", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});

app.post("/data", (req, res) => {
  // should post date, temp and content
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  res.send({ msg: "data posted successfully" });
  // because res.send("data posted..") led to an error (Error! SyntaxError: Unexpected token d in JSON at position 0)
  console.log("server ", projectData);
});
