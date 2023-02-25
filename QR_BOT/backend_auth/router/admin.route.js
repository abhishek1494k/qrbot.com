const adminRoute=require("express").Router();
const  {UserModel}=require("../model/user_model");
const {QRModel}=require("../model/qr.model");
const fs = require("fs");
adminRoute.get("/user/detail",async(req,res)=>{
    try {
        let data= await UserModel.aggregate([{
            $lookup:
              {
                from: "qrs" ,
                localField: "email",
                foreignField: "email",
                as:"list"
            }
         }])
         res.send(data)
    } catch (error) {
        console.log(error);
    }
});


adminRoute.post("/user/block",async (req,res)=>{
    try{
        let {email}=req.body
        let blacklistAcc = JSON.parse(fs.readFileSync("./blacklistuser.json", "utf-8"));
    console.log(blacklistAcc);
    blacklistAcc.push(email);
    console.log(blacklistAcc);
   fs.writeFileSync("./blacklistuser.json", JSON.stringify(blacklistAcc));
        console.log(email)
        res.send({msg:`${email} has been blacklisted`})
    }catch(err){
        console.log(err)
        res.send("can't block")
    }
})
adminRoute.get("/user/block/details",(req,res)=>{
  try{
    let detail=JSON.parse(fs.readFileSync("./blacklistuser.json","utf-8"))
    console.log(detail)
    res.send(detail)
  }catch(err){
    console.log(err)
    res.send("can't find")
  }
})
// adminRoute.delete("/user/delete",async (req,res)=>{
//     let data=req.body
//     let {email}=data
//     try{
//         let QR=await QRModel.find({email})
//         let user=await UserModel.find({email})
//         console.log(user,QR)
//         res.send({user,QR})
//     }catch(err){
//         console.log(err)
//         res.send("can't blacklist")
//     }

// })
module.exports={
    adminRoute
}