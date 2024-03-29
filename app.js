var http = require("http"),
  express = require("express"),
  path = require("path"),
  app = express(),
  tc;

// Load Controllers
tc = require("./controllers/todo_controller.js");

app.configure(function () {
  "use strict";
  // Define our static file directory, it will be 'public'                             
  app.use(express.static(path.join(__dirname, "public")));

  // This allows us to parse the post requests data
  app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
  "use strict";
  console.log("Server running on port 3000");
});

app.get("/tlist.json", tc.list);
app.post("/todos/new", tc.create);
app.post("/todos/delete", tc.destroy);
