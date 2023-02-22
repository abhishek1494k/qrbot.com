const express=require("express");
const app=express();
const {passport}=require("passport");
const {connection}=require("./configuration/db");
const {gitRoute}=require("./auth/github")
require('dotenv').config();
const cors=require("cors");
const {UserRouter}=require("./router/user");
const {googleRouter}=require("./auth/google");
const {fbRouter}=require("./auth/facebook")
app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(gitRoute);
app.use(googleRouter);
app.use(fbRouter);




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log("db is not connected");
    }
    console.log(`http://localhost:${process.env.port}`);
});