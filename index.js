var app = require("express");
var bodyparser = require("body-parser");

app.use(bodyparser.json())



app.listen(3000);
