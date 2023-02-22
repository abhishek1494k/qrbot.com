const express=require("express");
const UserRouter=express.Router();
const {UserModel}=require("../model/user_model");
const {bcrypt}=require("bcrypt")
const {jwt}=require("jsonwebtoken");


UserRouter.post("/signup",async(req,res)=>{
    try {
        const {name,email,pass}=req.body;
        const signedata=await UserModel.find({email});
        if(signedata.length==0){
            bcrypt.hash(pass,5,async(err,hash)=>{
                if(!err){
                    let data={name,email,pass:hash}
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
        const {email,pass}=req.body;
        let passdata=await UserModel.find({email});
        if(passdata.length==0){
            bcrypt.compare(pass, passdata[0].pass, function(err, result) {
                if(result){
                    var token=jwt.sign({dataid:passdata[0]._id},process.env.token_secret);
                    res.send({"msg":"Successfully logged in"},token);
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

module.exports={
    UserRouter
}