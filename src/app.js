const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 7800;

const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("error404", {
    errorMsg: "Looks like you are lost",
  });
});

app.listen(port, () => {
  console.log(`Weather project live at port ${port}`);
});
