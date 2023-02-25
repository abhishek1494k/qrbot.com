const adminRoute = require("express").Router();
const { UserModel } = require("../model/user_model");
const { QRModel } = require("../model/qr.model");
const fs = require("fs");

const { adminAuthentication } = require("../middleware/adminAuthentication");
adminRoute.use(adminAuthentication);

adminRoute.get("/user/detail", async (req, res) => {
  try {
    let data = await UserModel.aggregate([
      {
        $lookup: {
          from: "qrs",
          localField: "email",
          foreignField: "email",
          as: "list",
        },
      },
    ]);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

adminRoute.post("/user/block", async (req, res) => {
  try {
    let blacklistAcc = JSON.parse(
      fs.readFileSync("./blacklistuser.json", "utf-8")
    );
    blacklistAcc.push(req.body.list[0].email);
    fs.writeFileSync("./blacklistuser.json", JSON.stringify(blacklistAcc));
    console.log(req.body.list[0].email);
    res.send({ msg: `${req.body.list[0].email} has been blacklisted` });
  } catch (err) {
    console.log(err);
    res.send("can't block");
  }


});

adminRoute.get("/user/block/details", (req, res) => {
  try {
    let detail = JSON.parse(fs.readFileSync("./blacklistuser.json", "utf-8"));
    console.log(detail);
    res.send(detail);
  } catch (err) {
    console.log(err);
    res.send("can't find");
  }
});

adminRoute.post("/user/unblock",(req,res)=>{
    let data=req.body;
    try{
        let blacklistAcc = JSON.parse(
            fs.readFileSync("./blacklistuser.json", "utf-8")
          ); 
          let X=blacklistAcc.findIndex((el)=>{return el==data.usermail})
          blacklistAcc.splice(X,1)
          fs.writeFileSync("./blacklistuser.json", JSON.stringify(blacklistAcc));
         console.log(blacklistAcc)
         res.send({ msg: `${req.body.usermail} has been blacklisted` });
    }catch(err){
        console.log(err)
        res.send("can't unblock")
    }
    // console.log(data)
    // res.send("ok")
})
adminRoute.delete("/user/delete",async (req,res)=>{
    let data=req.body
    let email=data.list[0].email
    try{
        let QR=await QRModel.findOneAndRemove({email})
        let user=await UserModel.findOneAndRemove({email})
        console.log(QR)
        res.send({user,QR})
    }catch(err){
        console.log(err)
        res.send("can't blacklist")
    }
     //console.log(data)
    // res.send("ok")
})
module.exports = {
  adminRoute,
};
