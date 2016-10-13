var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/taskmanager", function() {
  console.log("Database connected")
})

var Task = mongoose.model('Task', {
  checked: { type: Boolean, default: false },
  name: { type: String, required: true }
})

module.exports = Task;
