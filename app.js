const express = require("express");
const bodyparser = require("body-parser");
var ejs = require("ejs");
const date = require(__dirname + "/date.js"); //that's how we can get functions from other files

var items = ["buy food", "cook food", "eat food"];
let workItems = [];

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

// app.post("/work", function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.get("/", function (req, res) {
  let day = date.getDate();
  
  res.render("list", { listTitle: day, newListitem: items }); //rendering file called list with ejs ending in view folder. we give paramter value day. kindOfday = html text


});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListitem: workItems });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
