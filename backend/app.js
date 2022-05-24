const express= require('express');
const app=express();
const PORT = 9090;
var cors = require('cors');
const bodyparser=require('body-parser');

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.urlencoded({ extended: true }));

const sequelize=require("./server/database/connection");

sequelize.sync().then((result)=>{
    console.log("Database created.....")
    }).catch((err)=>{
        console.log('error occured....')
    });

    // load routers
    require("./server/route/user.route")(app);

    app.get("/",(req,res)=>
    {
        res.json({"message": "Application started...."});
    })
app.listen(PORT,()=>
{
    console.log("Server is listening " +`http://localhost:${PORT}`)
})