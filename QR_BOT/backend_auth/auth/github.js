const express=require("express");
require('dotenv').config();
const cookieParser = require('cookie-parser')
const gitRoute=express.Router();
const helmet = require("helmet");
const  path=require("node:path");

const app=express();
app.use(cookieParser());
app.use(helmet());



const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// gitRoute.get("/login",async(req,res)=>{
//     try {
//         res.sendFile(__dirname+"/index.html")
//     } catch (error) {
//         console.log(error);
//     }
// })



gitRoute.get("/github/home",async(req,res)=>{
    try {
        const {code}=req.query;
        let access_token=await fetch("https://github.com/login/oauth/access_token",{
            method:"POST",
            headers : {
                "Content-type" : "application/json",
                Accept : "application/json"
            },
            body:JSON.stringify({
                client_id:process.env.Client_ID,
                client_secret:process.env.client_secret,
                code
            })
        }).then((res)=>res.json())
        let userDetails=await fetch("https://api.github.com/user",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${access_token.access_token}`
            },
        }).then((ress)=>ress.json());
        // console.log(userDetails);
        // console.log(userDetails.email);
        let email=userDetails.email;
        let name=userDetails.name
        const obj={
            name,email
        }
        console.log("obj");
        // res.send({"msg":"Signup Sucessful"})
        res.sendFile(path.join(__dirname+"../../../Frontend/index.html"))
    } catch (error) {
        console.log(error);
    }
})
// app.use(express.static(path.join(__dirname,"..", "Frontend")));

gitRoute.get('/setcookie', (req, res) => {
    console.log("cokkie");
    // localStorage.setItem("info","informaitio")
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
   
    // res.redirect("http://127.0.0.1:5500/tough-cheese-1567/QR_BOT/Frontend/index.html")
});

module.exports={
    gitRoute
}
