var express = require("express")
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendfile("./index.html")
})

app.use("/api", require("./task.ctrl.js"))

app.listen(3000);
