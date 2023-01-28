const express = require("express");
const TokenModel = require("../../Models/GoogleToken");
const UserModel = require("../../Models/Users");
const router = express.Router();
const SendMail = require("../../utils/SendMail");
const crypto = require("crypto");
const AllUsersModel = require("../../Models/Allusers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ROUTE 1 : REGISTER WITH MAIL AND SEND VERIFY EMAIL
router.post("/createaccount", async (req, res) => {
  const finduser = await AllUsersModel.findOne({ Email: req.query.email });
  if (!finduser) {
    const finduser2 = await UserModel.findOne({ email: req.query.email });
    let user = null;
    if (!finduser2) {
      user = await UserModel.create({ email: req.query.email });
    } else {
      user = finduser2;
    }

    if (user) {
      const token = assigntoken(user);
      if (token) {
        return res.status(200).json({
          success: true,
          msg: "email has been sent to your email addrsss",
        });
      } else {
        return res
          .status(400)
          .json({ success: false, msg: "error in sending the mail" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "error in creating the user" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "This Email is Already Registered" });
  }
});

async function assigntoken(user) {
  const token = await TokenModel.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  const url = `${process.env.BASE_URL}auth/signup/emailverification?user=${user._id}&token=${token.token}`;
  const sendmail = await SendMail(user.email, "Verify Your Email Address", url);
  if (sendmail) {
    return true;
  } else {
    return false;
  }
}

// ROUTE 2 : VERIFY TOKEN/EMAIL AND CREATE USER ACCOUNT
router.post("/verifyemail/:userid/:token", async (req, res) => {
  const user = await UserModel.findById(req.params.userid);
  if (user) {
    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (token) {
      const newUser = await AllUsersModel.create({
        Email: user.email,
        AccountType: "email",
        isEmailVerified: true,
      });
      if (newUser) {
        await UserModel.findByIdAndDelete(req.params.userid);
        await TokenModel.findByIdAndDelete(token._id);
        return res.status(200).json({
          success: true,
          User: newUser,
        });
      } else {
        return res.status(400).json({
          success: false,
          user: false,
          msg: "error in creating the user account",
        });
      }
    } else {
      return res.status(400).json({ success: false, msg: "invalid Link" });
    }
  } else {
    return res.status(400).json({ success: false, msg: "Invalid Link" });
  }
});

// ROUTE 3 : Login User with Email and password
router.post("/login", async (req, res) => {
  console.log("body is ");
  console.log(req.body);
  // try {
  const User = await AllUsersModel.findOne({ Email: req.body.email });
  if (User) {
    const password = await bcrypt.compare(req.body.password, User.Password);
    if (password) {
      const authtoken = jwt.sign(
        {
          userId: User?._id,
          profileId: User?.profileId,
          email: User?.Email,
          ProfilePicture: User?.ProfilePicture,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        User: User,
        msg: "Login Sucessfull",
        authtoken,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Wrong Credentials! Try Again" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "Wrong Credentials! Try Again" });
  }
  // } catch (error) {
  //   return res
  //     .status(400)
  //     .json({ success: false, msg: "Internal Server Error" });
  // }
});

module.exports = router;
