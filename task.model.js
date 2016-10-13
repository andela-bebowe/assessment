var mongoose = require("mongoose");
var db;

if(process.env.NODE_ENV == 'test') {
	mongoose.connect("mongodb://localhost/taskmanager_test");
}
else {
	mongoose.connect("mongodb://localhost/taskmanager");
}

var Task = mongoose.model('Task', {
  checked: { type: Boolean, default: false },
  name: { type: String, required: true }
})

module.exports = Task;
