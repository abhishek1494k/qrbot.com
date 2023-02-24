const adminRoute=require("express").Router();
const  {UserModel}=require("../model/user_model");
const {QRModel}=require("../model/qr.model");

adminRoute.get("/user/detail",async(req,res)=>{
    try {
        // console.log("object");
        // let newdata=await UserModel.find();
        // console.log(newdata[0]._id);
        let data= await UserModel.aggregate([{
            $lookup:
              {
                from: "QRModel" ,
                localField: "email",
                foreignField: "email",
                as:"USerQrGeneratedList"
            }
         }])
         console.log(data);
         res.send("obj")
    } catch (error) {
        console.log(error);
    }
});

module.exports={
    adminRoute
}