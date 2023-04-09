const express=require("express");
const app=express();
app.use(express.json());

require('dotenv').config();
const cors=require("cors");
app.use(cors());

const {UserRouter}=require("./router/user");
const { qrRouter } = require("./router/qr_gen_save");
const {adminRoute}=require("./router/admin.route");

app.use('/',UserRouter);
app.use('/qr',qrRouter);
app.use('/admin',adminRoute)

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