var Todo = require("../models/todo.js"),
  TodoController = {};

TodoController.list = function (req, res) {
  Todo.find({}, function (err, todos) {
    "use strict";
    if (err !== null) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
};

TodoController.create = function (req, res) {
  "use strict";
  var t = new Todo({
    "item": req.body.item,
    "categories": req.body.categories
  });

  t.save(function (err, result) {
    if (err !== null) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

TodoController.destroy = function (req, res) {
  "use strict";
  Todo.findOne({"item": req.body.item}, function (err, todo) {
    if (err !== null) {
      console.log(err);
    } else if (todo === null) {
      console.log("Todo not found.");
    } else {
      todo.remove(function (err) {
        if (err !== null) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = TodoController;