const express=require("express");
const app=express();
app.use(express.json());

require('dotenv').config();
const cors=require("cors");
app.use(cors());

const {UserRouter}=require("./router/user");
// const passport=require("passport");
// const cookieParser = require('cookie-parser')
// const {gitRoute}=require("./auth/github")
// const {googleRouter}=require("./auth/google");
// const {fbRouter}=require("./auth/facebook");
// const {Qr_save_Router}=require("./router/qr_gen_save");
// const {adminRoute}=require("./router/admin.route");
// app.use(gitRoute);

app.use('/',UserRouter);
// app.use(googleRouter);
// app.use('/qr',Qr_save_Router);
// app.use('/user',adminRoute)

// ---------->>>>> Connection <<<<<------------//
const {connection}=require("./configuration/db");
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log(`http://localhost:${process.env.port}/`);
    } catch (error) {
        console.log("Error in Connecting to DB");
    }
});