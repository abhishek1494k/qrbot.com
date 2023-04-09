
const { authenticate } = require("../middleware/authenticate");
const {QRModel}=require("../model/qr.model");


const qrRouter=require("express").Router();

qrRouter.post("/post",authenticate,async(req,res)=>{
    try {
        let {url,size,email,userID}=req.body;
        let data=new QRModel({url,size,email,userID});
        await data.save();
        res.send({"msg":"Generated Qr data saved"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
});

module.exports={
    qrRouter
}