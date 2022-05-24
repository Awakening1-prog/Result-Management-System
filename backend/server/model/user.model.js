const Sequelize=require("sequelize");
var Userdb = require('../database/connection');
module.exports=Userdb.define("studentData",{
    rollno:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },    
    name:{
        type:Sequelize.STRING,
        allowNull:false,
       
    },
    dob:{
        type:Sequelize.STRING,
        allowNull:false,
       
    },
    score:{
        type:Sequelize.INTEGER,
        allowNull:false,
       
    }},
    );

