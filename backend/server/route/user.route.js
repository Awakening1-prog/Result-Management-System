module.exports = app => {
    const user = require("../controller/user.controller.js");
  
    var router = require("express").Router();
    //Create Login for teacher
    router.post("/register",user.make);
    //
    router.get("/register",user.find1);
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all User
    router.get("/", user.find);
  
    // Retrieve a single User with id
    router.get("/:rollno", user.findOne);
  
    // Update a User with id
    router.put("/:rollno", user.update);
  
    // Delete a User with id
    router.delete("/:rollno", user.delete);

    app.use('/api/user', router);
  };
  