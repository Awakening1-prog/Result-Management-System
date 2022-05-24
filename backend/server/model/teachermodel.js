const Sequelize=require("sequelize");
var Userdb = require('../database/connection');
var bcrypt = require('bcrypt');
var Userdb=Userdb.define("teacher",{
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },    
    password:{
        type:Sequelize.STRING,
        allowNull:false,
       
    }
});
module.exports=Userdb;