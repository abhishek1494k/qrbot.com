const express=require("express");
const UserRouter=express.Router();
const {UserModel}=require("../model/user_model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { Router } = require("express");
const fs=require("fs")
const { authentication } = require("../middleware/authenticate");

UserRouter.get("/refresh",async(req,res)=>{
    let token=req.headers.authorization;
    if(token){
        let decoded=jwt.verify(token,process.env.Refresh_token_secret);
        if(decoded){
            console.log(decoded);
            let dataid=decoded.dataid;
            let new_token=jwt.sign({dataid},process.env.token_secret,{expiresIn:60});
            res.send({"msg":"referesh token generrated",new_token});
        
        }
    }else{
        res.send({"msg":"login again"})
    }
})

UserRouter.post("/logout",async(req,res)=>{
    try {
        let token=req.headers.authorization;
        let blacklistAcc=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
        console.log(blacklistAcc);
        blacklistAcc.push(token);
        console.log(blacklistAcc);
        fs.writeFileSync("./blacklist.json",JSON.stringify( blacklistAcc));
        res.send({"msg":"logout successfull"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
UserRouter.post("/signup",async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const signedata=await UserModel.find({email});
        if(signedata.length==0){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(!err){
                    let data={name,email,password:hash}
                    const UserData=new UserModel(data);
                    await UserData.save();
                    res.send({"msg":"Successfully Signed Up"})
                }else{
                    console.log(err);
                    res.send({"msg":"something wrong in hashing"})
                }
            })
        }else{
            res.send({"msg":"you have been already Signed Up"})
        }
    } catch (error) {
        console.log(error);
        console.log("something went wrong");
        res.send({"error":error})
    }
});

UserRouter.post("/login",async(req,res)=>{{
    try {
        const {email,password}=req.body;
        let passdata=await UserModel.find({email});
        // console.log(passdata);
        if(passdata.length==1){
            bcrypt.compare(password, passdata[0].password, function(err, result) {
                if(result){
                    var token=jwt.sign({dataid:passdata[0]._id},process.env.token_secret,{expiresIn:90});
                    var Refreshtoken=jwt.sign({dataid:passdata[0]._id},process.env.Refresh_token_secret,{expiresIn:300});
                    res.send({"msg":"Successfully logged in",token,Refreshtoken,name:passdata[0].name});
                }else{
                    console.log(err);
                    res.send({"msg":"Wrong Password"})
                }
            });
        }else{
            res.send({"msg":"You have not been SignedUp yet"})
        }
       
    } catch (error) {
        console.log(error);
        console.log("something went wrong");
        res.send({"error":error})
    }
}});
UserRouter.get("/admin",authentication,async(req,res)=>{
    try {
        res.send("protected route")
    } catch (error) {
        
    }
});

module.exports={
    UserRouter
}