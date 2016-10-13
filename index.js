var app = require("express")();
var bodyparser = require("body-parser");

app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.sendfile("./index.html")
})

app.use("/api", require("./task.ctrl.js"))

app.listen(3000, function () {
  console.log("Server started");
});
