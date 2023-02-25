const express=require("express");
require('dotenv').config();

const gitRoute=express.Router();
const app=express();



const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// gitRoute.get("/",async(req,res)=>{
//     try {
//         res.send("Home_Page")
//     } catch (error) {
//         console.log(error);
//     }
// })

gitRoute.get("/login",async(req,res)=>{
    try {
        res.sendFile(__dirname+"/index.html")
    } catch (error) {
        console.log(error);
    }
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});


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
        console.log(userDetails);
        // console.log(userDetails.email);
        let email=userDetails.email;
        let name=userDetails.name
        const obj={
            name,email
        }
        console.log(obj);
        // res.send({"msg":"Signup Sucessful"})
        res.status(200).redirect("http://127.0.0.1:5501/QR_BOT/Frontend/index.html")
        // res.sendFile(__dirname+"/index.html")
    } catch (error) {
        console.log(error);
    }
})

module.exports={
    gitRoute
}
