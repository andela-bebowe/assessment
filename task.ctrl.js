var Task = require("./task.model.js");
var router = require("express").Router();

var handleError = function (res, message) {
  res.status(404).json({"error": message})
}

router.route("/tasks")
  .post(function(req, res) {
    var task = new Task({ name: req.body.name });

    task.save(function(err, task) {
      if(err) { handleError(res, err.message) }

      res.status(200).json(task)
    })
  })
  .get(function (req, res) {
    Task.find().exec(function (err, tasks) {
      if(err) { handleError(res, err.message) }

      res.status(200).json(tasks)
    })
  })

router.put("/tasks/:task_id", function (req, res) {
  Task.findById(req.params.task_id, function (err, task) {
    task.name = res.body.name || task.name
    task.checked = res.body.checked || task.checked

    task.save(function (err, task) {
      if(err) { handleError(res, err.message) }

      res.status(200)
    })
  })
})

module.exports = router;
