const adminRoute=require("express").Router();
const  {UserModel}=require("../model/user_model");
const {QRModel}=require("../model/qr.model");

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

module.exports={
    adminRoute
}