var main = function () {
  "use strict";
  var stack = [],
    unique = [],
    i = 0,
    tabCounter = 0,
    compareCounter,
    setUpClickHandler = function (anchor) {
      anchor.click(function () {
        var target = $(this).attr("href");
        $(".active").addClass("inactive").removeClass("active");
        $(this).addClass("active");
        $("#" + target).addClass("active").removeClass("inactive");
        $(".content .inactive").slideUp(550, function() {
          $(".content .active").slideDown(550);
        });

        return false;
      });
    };


  $.getJSON("tlist.json", function (todos) {
    todos.forEach(function (todo) {
      todo.categories.forEach(function (category) {
        stack.push(category);
      });
    });

    //http://stackoverflow.com/questions/5381621/jquery-function-to-get-all-unique-elements-from-an-array
    unique = stack.filter(function (itm, i, a) {
      return i === a.indexOf(itm);
    });

    unique.forEach(function (tag) {
      $("#tab2").append("<div id ='" + unique[i].split(" ").join("") + "'><h3>" + tag + "</h3><br /><hr /></div>");
      i += 1;
    });
    todos.forEach(function (todo) {
      $("#tab1").append("<div class='todo " + tabCounter + "'></div>");
      $("#tab1 ." + tabCounter + ".todo").append("<h3>" + todo.item + " <button class='destroy " + tabCounter + "'>x</button></h3>" + "<h4>tagged: </h4>");
      todo.categories.forEach(function (category) {
        //for All tab
        $("#tab1 ." + tabCounter + ".todo").append("<p>" + category + "</p>");
        //for Categories tab
        $("#tab2 #" + category + " br").before("<div class='" + tabCounter + "'><p>" + todo.item + " <button class='destroy " + tabCounter + "'>x</button></p></div>");
      });
      //for All tab
      $("#tab1 ." + tabCounter + ".todo").append("<br /><hr />");
      tabCounter += 1;
    });
  });

  //for both tabs
  $("body").on("click", ".destroy", function () {
    var toNuke = $(this).attr("class").split(" ").slice(-1);
    $("." + toNuke).fadeOut(1000, function () {
      $("." + toNuke).remove();
    });
  });

  //Add tab
  /*$.post("/people/new", { "name":"Sylvan", "age":20 }, function (response) {
	console.log(response);

	console.log("getting the json file a second time");
	$.getJSON("/people.json", function (response) {
	    console.log(response);
	});	
    });*/
  $("#addToDo").val("task goes here");
  $("#addTags").val("tags go here");

  $("body").on("click", "#submit", function () {
    $("#added").fadeOut(200);
    $("#added").fadeIn(1000);
    

    var tagArray = $("#addTags").val().split(","),
      toDoItem = $("#addToDo").val(),
      post_object = {},
      tCount,
      isUnique;
      
    if (toDoItem === "") {
      alert("Please give your item a name.");
    } else {
      post_object.item = toDoItem;
      post_object.categories = tagArray;
      console.log(post_object);
      
      $.post("/todos/new", post_object, function (response) {
        console.log(response);
        $("#addToDo").val("task goes here");
        $("#addTags").val("tags go here");
      });
    }
  /*

	    $.post("/people/new", post_object, function (response) {
		console.log(response);
		addPersonToList(response);
		$("#name").val("");
		$("#age").val("");
	    });
	}
  });*/
    $("#tab1").append("<div class='todo " + tabCounter + "'></div>");
     $("#tab1 ." + tabCounter + ".todo").append("<h3>" + toDoItem + " <button class='destroy " + tabCounter + "'>x</button></h3>" + "<h4>tagged: </h4>");
    //for All tab
    for (tCount = 0; tCount < tagArray.length; tCount += 1) {
      $("#tab1 ." + tabCounter + ".todo").append("<p>" + tagArray[tCount] + "</p>");
    }

    //for Categories tab
    for (tCount = 0; tCount < tagArray.length; tCount += 1) {
      for (compareCounter = 0; compareCounter < unique.length; compareCounter += 1) {
        if (tagArray[tCount] === unique[compareCounter]) {
          isUnique = false;
          break;
        } else if (tagArray[tCount] !== unique[compareCounter]) {
          isUnique = true;
        }
      }

      if (isUnique === true) {
        unique.push(tagArray[tCount]);
        $("#tab2").append("<div id ='" + tagArray[tCount].split(" ").join("") + "'><h3>" + tagArray[tCount] + "</h3><br /><hr /></div>");
      }

      $("#tab2 #" + tagArray[tCount].split(" ").join("") + " br").before("<div class='" + tabCounter + "'><p>" + toDoItem + " <button class='destroy " + tabCounter + "'>x</button></p></div>");
    }

    //for All tab
    $("#tab1 ." + tabCounter + ".todo").append("<br /><hr />");

    tabCounter += 1;
  });
  setUpClickHandler($(".tabcontainer .tab"));
  
};
$(document).ready(main);
