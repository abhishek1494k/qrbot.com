const Qr_save_Router=require("express").Router();
const {authentication}=require("../middleware/authenticate");
const {QRModel}=require("../model/qr.model");

Qr_save_Router.post("/qr/post",authentication,async(req,res)=>{
    try {
        let {url,size,email}=req.body;
        // console.log(req.body);
        // let id=`ObjectId("${userID}")`
        // console.log(id);
        let data=new QRModel({url,size,email});
        await data.save();
        res.send({"msg":"Generated Qr data saved"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
});

module.exports={
    Qr_save_Router
}