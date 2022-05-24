const Userdb = require("../model/user.model");
const Teacherdb=require("../model/teachermodel");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
require("dotenv").config();

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.rollno) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

 // Create a user
 const user = {
    rollno: req.body.rollno,
    name: req.body.name,
    dob:req.body.dob,
    score:req.body.score
  };
// Save user in the database
Userdb.create(user)
.then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while creating the user."
  });
});
};

// Find a single user with an rollno
exports.findOne = (req, res) => {
    const rollno = req.params.rollno;
  
    Userdb.findByPk(rollno)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with rollno=" + rollno
        });
      });
  };



exports.find = (req,res)=>{
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.substr("Bearer".length + 1);

    webToken.verify(token, process.env.secret_key, (err, user) => {
      if (user) {
        console.log("in line 67" ,user);
        Userdb.findAll()    
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })  
    };
    })
  }
}
    // Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const rollno = req.params.rollno;

  Userdb.update(req.body, {
    where: { rollno: rollno }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with rollno=${rollno}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const rollno = req.params.rollno;

  Userdb.destroy({
    where: { rollno: rollno }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with rollno=${rollno}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with rollno=" + rollno
      });
    });
};

exports.make = (req, res) => {

  const {
    password,
    email
  } = req.body;

  if (
    password == "" ||
    password == undefined ||
    email == "" ||
    email == undefined
  ) {
    res.status(401).json({
      message: "Fill All Fields",
      status: res.statusCode,
    });
  } else {
    // check mail in db or not

    Teacherdb.findOne({
      where: {
        email,
      },
    }).then((value) => {
      if (value === null) {
        res.status(401).json({
          message: "Email is not Registered ",
          status: res.statusCode,
          token: ''
        });
      } else {
        // if mail is there check the password is correct or wrong
        const dbPassword = value.getDataValue("password");

        const userDetail = {
          email: value.getDataValue("email"),
        };

        bcrypt.compare(password, dbPassword, function (err, result) {
          console.log("in 171 ", password,dbPassword);
          if (password==dbPassword) {
            const token = webToken.sign(userDetail, process.env.secret_key, {
              expiresIn: "90s",
            });
            res.status(200).json({
              message: "Logged In successfully",
              status: res.statusCode,
              token,
            });
          } else {
            res.status(401).json({
              message: "Invalid Crendential given",
              status: res.statusCode,
              token: ''
            })
          }
        });
      }
    });
  }
}

exports.find1 = (req,res)=>{
  Teacherdb.findAll()    
  .then(user => {
          res.send(user)
      })
      .catch(err => {
          res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
      })
  }
