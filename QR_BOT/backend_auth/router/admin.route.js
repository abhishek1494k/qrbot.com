const adminRoute = require("express").Router();
const { UserModel } = require("../model/user_model");
const { QRModel } = require("../model/qr.model");
const fs = require("fs");

const { adminAuthentication } = require("../middleware/adminAuthentication");
adminRoute.use(adminAuthentication);

adminRoute.get("/detail", async (req, res) => {
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

adminRoute.post("/block", async (req, res) => {
  try {
    // let users=await UserModel.find()
    let blacklistAcc = JSON.parse(
      fs.readFileSync("./blacklistuser.json", "utf-8")
    );
    blacklistAcc.push(req.body.list[0].email);
    console.log(req.body.list[0].email)
    fs.writeFileSync("./blacklistuser.json", JSON.stringify(blacklistAcc));
    res.send({ msg: `${req.body.list[0].email} has been blacklisted`});
  } catch (err) {
    console.log(err);
    res.send({msg:'Cannot Blocked'});
  }
});

adminRoute.get("/block/details", (req, res) => {
  try {
    let detail = JSON.parse(fs.readFileSync("./blacklistuser.json", "utf-8"));
    console.log(detail);
    res.send(detail);
  } catch (err) {
    console.log(err);
    res.send("can't find");
  }
});

adminRoute.post("/unblock",(req,res)=>{
    let data=req.body;
    try{
        let blacklistAcc = JSON.parse(
            fs.readFileSync("./blacklistuser.json", "utf-8")
          ); 
          let X=blacklistAcc.findIndex((el)=>{return el==data.usermail})
          blacklistAcc.splice(X,1)
          fs.writeFileSync("./blacklistuser.json", JSON.stringify(blacklistAcc));
         console.log(blacklistAcc)
         res.send({ msg: `${req.body.usermail} account has been Unblocked` });
    }catch(err){
        console.log(err)
        res.send("can't unblock")
    }
    // console.log(data)
    // res.send("ok")
})

adminRoute.delete("/delete",async (req,res)=>{
  var email;
  // console.log(typeof(req.body.list[0]))
  if( typeof(req.body.list[0]) == "string"){
    email=req.body.list[0]
    console.log("YES")
  }else{
    email=req.body.list[0].email;
  }

    try{
        await QRModel.findOneAndRemove({email})
        await UserModel.findOneAndRemove({email})
        res.send({msg:`${email} has been Deleted`})
    }catch(err){
        console.log(err)
        res.send("can't blacklist")
    }

})
module.exports = {
  adminRoute,
};
