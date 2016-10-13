var expect = require("chai").expect;
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var Task = require("../task.model.js");

chai.use(chaiHttp);

describe("Task Controller", function() {
	var self = this;
	self.task = [];

	Task.collection.drop();

	before(function(done){
		var newTask = new Task({ name: 'NewTask' });
		newTask.save(function(err, data) {
			self.task = data;
			done();
		});
	});


	after(function(done){
		Task.collection.drop();
		done();
	});

	var url = "http://localhost:3000/api"
	it("should return all tasks on /tasks GET", function (done) {
		chai.request(url)
			.get("/tasks")
			.end(function (err, res) {
				res.body.should.be.a('array');
				res.body[0].should.have.property('_id');
        		res.body[0].should.have.property('name');
        		res.body[0].should.have.property('checked');
        		res.body[0].name.should.equal('NewTask');
        		done();
			})
	});
	it("should return a status of 200 on /tasks GET", function (done) {
		chai.request(url)
			.get("/tasks")
			.end(function (err, res) {
				expect(res.statusCode).to.equal(200);
        		done();
			})
	});
	it("should return a status of 200 on /tasks POST", function (done) {
		chai.request(url)
			.post("/tasks")
			.send({'name': 'Test'})
			.end(function (err, res) {
				expect(res.statusCode).to.equal(200);
        		done();
			})
	});
	it("should create a new task on /tasks POST", function (done) {
		chai.request(url)
			.post("/tasks")
			.send({'name': 'Test'})
			.end(function (err, res) {
				expect(res.body.name).to.equal('Test');
        		done();
			})
	});
	it("should not create a new task with wrong attributes on /tasks POST", function (done) {
		chai.request(url)
			.post("/tasks")
			.send({'wrong': 'Test'})
			.end(function (err, res) {
				expect(res.body.task).to.equal(undefined);
				expect(res.body.error).to.equal("Task validation failed");
        		done();
			})
	});
	it("should update check status of task on /tasks/:task_id PUT", function (done) {
		self.task.name = "New Name";
		chai.request(url)
			.put("/tasks/" + self.task._id)
			.send(self.task)
			.end(function (err, res) {
				expect(res.statusCode).to.equal(200);
				expect(res.body.name).to.equal("New Name");
				expect(res.body.checked).to.equal(true);
        		done();
			})
	});
	it("should delete task on /tasks/:task_id DELETE", function (done) {
		chai.request(url)
			.delete("/tasks/" + self.task._id)
			.end(function (err, res) {
				expect(res.body.message).to.equal("Successfully Deleted");
        		done();
			})
	});
})