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
  });

router.route("/tasks/:task_id")
  .put(function (req, res) {
    Task.findByIdAndUpdate(req.params.task_id, { name: req.body.name, checked: !req.body.checked }, function (err, task) {
      if(err) { handleError(res, err.message) }

      task.save(function (err, task) {
        if(err) { handleError(res, err.message) }

        res.status(200).json(task);
      })
    })
  })
  .delete(function (req, res) {
    Task.findByIdAndRemove(req.params.task_id, function (err, data) {
      if(err) { handleError(res, err.message) }

      res.status(200).json(data);
    })
  })
module.exports = router;
