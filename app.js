angular.module("Task", [])
  .controller("TaskCtrl", ["TaskServ", function (TaskServ) {
    var vm = this;
    vm.tasks = [];

    TaskServ.getTasks()
      .success(function (data) {
        vm.tasks = data;
      })
      .error(function (err) {
        console.log(err.message)
      });

    vm.create = function () {
      if(vm.newname !== "") {
        TaskServ.postTask(vm.newname)
        .success(function (data) {
          vm.tasks.push(data);
          vm.newname = null;
        })
        .error(function (err) {
          console.log(err.message)
        });
      }
      
    }

    vm.check = function (task) {
      TaskServ.checkTask(task)
        .success(function (data) {
          task.checked = !task.checked;
        })
        .error(function (err) {
          console.log(err.message)
        })
    }

    vm.delete = function (task, index) {
      TaskServ.deleteTask(task)
        .success(function (data) {
          vm.tasks.splice(index, 1);
        })
        .error(function (err) {
          console.log(err.message)
        })
    }

  }])
  .service("TaskServ", ["$http", function ($http) {
    this.getTasks = function () {
      return $http.get("/api/tasks");
    }

    this.postTask = function (name) {
      return $http.post("/api/tasks", {"name": name});
    }

    this.checkTask = function (task) {
      return $http.put("/api/tasks/" + task._id, task);
    }
    this.deleteTask = function (task) {
      return $http.delete("/api/tasks/" + task._id);
    }
  }])
