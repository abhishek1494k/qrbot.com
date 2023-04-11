const { authenticate } = require("../middleware/authenticate");
const { QRAnaModel } = require("../model/qr_ana.model");

const qrAnaRouter=require("express").Router();

qrAnaRouter.post("/post",authenticate,async(req,res)=>{
    console.log(req.body)
    try {
        let {url,email,userID}=req.body;
        let data=new QRAnaModel({url,email,userID});
        await data.save();
    res.send({"msg":"Analysed Qr data saved"})
    } catch (error) {
        res.send({"msg":"Analysed Something went wrong"})
    }
});

module.exports={
    qrAnaRouter
}
