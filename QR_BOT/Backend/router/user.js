const express = require("express");
const UserRouter = express.Router();

const { UserModel } = require("../model/user_model");

require("dotenv").config();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ------------->>>>> Home Page <<<<<----------------
UserRouter.get("/", (req, res) => {
  res.send("Home");
});

// --------------->>>>> Signup <<<<<-----------------
UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Find in User Database
    const user = await UserModel.find({ email });
    if (user.length === 0) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (!err) {
          const UserData = new UserModel({ name, email, password: hash });
          await UserData.save();
          return res.send({ msg: "Successfully Signed Up" });
        } else {
          return res.send({ msg: "Error in Signup", error: err });
        }
      });
    } else {
      return res.send({ msg: "You are already Registered" });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error });
  }
});

// ------------->>>>> User Login <<<<<----------------
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  {
    try {
      let passdata = await UserModel.find({ email });
      if (passdata.length === 1) {
        if (passdata[0].status === false) {
          return res.send({ msg: "You are Blocked" });
        }
        bcrypt.compare(password, passdata[0].password, function (err, result) {
          if (result) {
            var token = jwt.sign(
              { userID: passdata[0]._id, email: passdata[0].email },
              process.env.token_secret,
              { expiresIn: "1d" }
            );
            // NODE MAILER-------------------------------------------------------------------------
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "email.qrbot@gmail.com",
                pass: process.env.nodemailer,
              },
            });
            const mailOptions = {
              from: "email.qrbot@gmail.com",
              to: email,
              subject: "QRBot Login",
              text: `You Loggedin into QRBot.com @ ${
                year +
                "-" +
                month +
                "-" +
                date +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
              } using Email : ${email}`,
            };
            transporter
              .sendMail(mailOptions)
              .then((info) => {
                res.send({
                  msg: "Login Successful",
                  name: passdata[0].name,
                  token: token,
                });
              })
              .catch((e) => {
                res.send({ msg: "Error" });
              });
            // -------------------------------------------------------------------------------------
          } else {
            res.send({ msg: "Wrong Password" });
          }
        });
      } else {
        res.send({ msg: "You have not been Registered" });
      }
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
      res.send({ msg: "something went wrong", error: error });
    }
  }
});

// ------------->>>>> User logout <<<<<---------------
UserRouter.post("/logout", async (req, res) => {
  let token = req.headers.authorization;
  try {
    let blacklistAcc = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"));
    blacklistAcc.push(token);
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklistAcc));
    res.send({ msg: "logout successfull" });
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

module.exports = {
  UserRouter,
};
