const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync("server.log", log + "\n", err => {
    if (err) {
      console.log("Cant append to server");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintence.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("scream", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home PAge",
    messageHome: "Welcome Home"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "ABout PAge"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to handle" });
});

app.listen(8888, () => {
  console.log("Server is up");
});
