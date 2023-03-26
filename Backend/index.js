const express=require('express');
const cors=require('cors')
const { connection } = require('./db');
const { UserRoute } = require('./Routes/user.routes');
const {autorisation}=require("./middleware/user.middleware");
const { todoRoute } = require('./Routes/todo.routes');
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/",UserRoute);
app.use(autorisation)
app.use("/todo",todoRoute);


app.listen(process.env.Port, async()=>{
     try {
        await connection
        console.log("connected to db");
     } catch (error) {
        res.status(400).send({"msg":"can't connected to the db"});
        console.log(error)
     }
     console.log("server is running")
})
