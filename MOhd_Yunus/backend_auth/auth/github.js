const express=require("express");
const gitRoute=express.Router()
require('dotenv').config();
// const {github}=require("")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


gitRoute.get("/login",async(req,res)=>{
    try {
        res.sendFile(__dirname+"/index.html")
    } catch (error) {
        console.log(error);
    }
})
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
        // console.log(access_token);
        console.log(res);
        let userDetails=await fetch("https://api.github.com/users/"+credentials['username']+(auth = authentication),{
            method:"GET",
            headers:{
                Authorization:`Bearer ${access_token.access_token}`
            },
         

        }).then((ress)=>ress.json());
        console.log(userDetails);
        res.send("Signup Sucessful")
        // res.sendFile(__dirname+"/index.html")
    } catch (error) {
        console.log(error);
    }
})
module.exports={
    gitRoute
}