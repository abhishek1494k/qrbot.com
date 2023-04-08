const express = require("express");
const UserRouter = express.Router();

const { UserModel } = require("../model/user_model");
const { BlacklistuserModel } = require("../model/blockusermodel");
const { authentication } = require("../middleware/authenticate");

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
    // Find in Blocked Emails
    const { name, email, password } = req.body;
    let blockuser = await BlacklistuserModel.find({ block_email: email });
    if (blockuser) {
      return res.send({ msg: "You have been Blocked" });
    }
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
    res.send({ msg: "something went wrong", error: error });
  }
});

// ------------->>>>> Login User <<<<<----------------
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
      // Find in Blocked Email
      let blockuser = await BlacklistuserModel.find({ block_email: email });
      console.log(blockuser)
      if (blockuser.length >0) {
        return res.send({ msg: "You have been Blocked" });
      }
      let passdata = await UserModel.find({ email });
      if (passdata.length === 1) {
        bcrypt.compare(password, passdata[0].password, function (err, result) {
          if (result) {
            var token = jwt.sign(
              { dataid: passdata[0]._id, email: passdata[0].email },
              process.env.token_secret,
              { expiresIn: "1d" }
            );
            var Refreshtoken = jwt.sign(
              { dataid: passdata[0]._id, email: passdata[0].email },
              process.env.Refresh_token_secret,
              { expiresIn: "7d" }
            );
            // NODE MAILER-------------------------------------------------------------------------
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "forsmmpanel@gmail.com",
                pass: "noymjrhbxjwiclin",
              },
            });

            const mailOptions = {
              from: "forsmmpanel@gmail.com",
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
                console.log(passdata[0].name, token, Refreshtoken)
                console.log('Mail sent')
                res.send({ msg: "Login Successful",name:passdata[0].name, token:token, Refreshtoken:Refreshtoken });
              })
              .catch((e) => {
                res.send(e);
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
      res.send({ error: error });
    }
  }
});

// UserRouter.post("/logout", async (req, res) => {
//   try {
//     let token = req.headers.authorization;

//     let blacklistAcc = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"));
//     console.log(blacklistAcc);
//     blacklistAcc.push(token);
//     console.log(blacklistAcc);
//     fs.writeFileSync("./blacklist.json", JSON.stringify(blacklistAcc));
//     res.send({ msg: "logout successfull" });
//   } catch (error) {
//     console.log(error);
//     res.send({ msg: "something went wrong" });
//   }
// });

// UserRouter.get("/refresh", async (req, res) => {
//   let token = req.headers.authorization;
//   if (token) {
//     let decoded = jwt.verify(token, process.env.Refresh_token_secret);
//     if (decoded) {
//       console.log(decoded);
//       let dataid = decoded.dataid;
//       let new_token = jwt.sign({ dataid }, process.env.token_secret, {
//         expiresIn: 60,
//       });
//       res.send({ msg: "referesh token generrated", new_token });
//     }
//   } else {
//     res.send({ msg: "login again" });
//   }
// });

module.exports = {
  UserRouter,
};
