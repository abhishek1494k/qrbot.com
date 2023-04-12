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
  console.log(req.body);
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
            var mailOptions = {
              from: "email.qrbot@gmail.com",
              to: email,
              subject: "QRBot Login",
              html: ` <!DOCTYPE html>
              <html>
                <head>
                  <title>Example Email Template</title>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
                  <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
                    <tr>
                      <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                        <h1 style="font-size: 28px; color: #fff; margin: 0;">QR BOT</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Hello, [${passdata[0].name}]</h2>
                        <h5 style="margin-bottom: 20px;">Thank you for your recent Login with ${passdata[0].email}.</h5>
                        <p style="margin-bottom: 20px;">If you do have any issues, please don't hesitate to contact our customer service team. We're always happy to help.</p>
                        <p style="margin-bottom: 20px;">Thank you for choosing QR BOT</p>
                        <p style="margin-bottom: 0;">Best regards,</p>
                        <p style="margin-bottom: 20px;">QR BOT</p>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>`
            };
            transporter
              .sendMail(mailOptions)
              .then((info) => {
                res.send({
                  msg: "Login Successful",
                  name: passdata[0].name,
                  token: token,
                  email: passdata[0].email,
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
