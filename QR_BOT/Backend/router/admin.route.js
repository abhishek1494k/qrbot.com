const adminRoute = require("express").Router();
const fs = require("fs");

const { UserModel } = require("../model/user_model");
const { QRModel } = require("../model/qr.model");

adminRoute.get("/allUsers", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.send({ msg: "All Data", data: data });
  } catch (error) {
    console.log(error);
    res.send({ msg: "Error in Fetching Details" });
  }
});

adminRoute.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.send({ msg: `User has been Deleted` });
  } catch (err) {
    console.log(err);
    res.send({ msg: `Can't Deleted` });
  }
});

adminRoute.get("/blocked/Users", async (req, res) => {
  try {
    let data = await UserModel.find({status:false})
    console.log(data)
    res.send({msg:'Blocked User',data:data});
  } catch (err) {
    res.send({ msg:'No Blocked Users' });
  }
});

adminRoute.post("/blockUser/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await UserModel.findByIdAndUpdate(id, { status: false });
    res.send({ msg: "User is Blocked Now" });
  } catch (err) {
    res.send({ msg: "Error in Blocking" });
  }
});

adminRoute.post("/unblockUser/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await UserModel.findByIdAndUpdate(id, { status: true });
    res.send({ msg: "User is Unblocked Now" });
  } catch (err) {
    res.send({ msg: "Error in Blocking" });
  }
});

module.exports = {
  adminRoute,
};
