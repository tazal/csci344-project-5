var mongoose = require("mongoose"),
  TodoSchema,
  Todo;

mongoose.connect("mongodb://localhost/development");

TodoSchema = new mongoose.Schema({
  "item": String,
  "categories" : []
});

Todo = mongoose.model("Todo", TodoSchema);

//for debugging purposes
Todo.collection.drop();

Todo.findOne({}, function (err, result) {
  if (err !== null) {
	  console.log(err);
  } else if (result === null) {
	  var t = new Todo({
	    "item": "Buy Coffee",
	    "categories": ["groceries", "shopping"]
	  });
  	t.save(function (err) {
	    if (err !== null) {
	    	console.log(err);
	    }
	  });
  }
});

module.exports = Todo;