const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const AllUsersModel = require("../../Models/Allusers");

// Route 1: Main Login/SignUp With Google
router.post("/", async (req, res) => {
  const googleData = req.body;
  // console.log("the google data is ");
  // console.log(googleData);
  const findUser = await AllUsersModel.findOne({ Email: req.body.email });
  if (!findUser) {
    const newUser = await AllUsersModel.create({
      Email: req.body.email,
      AccountType: req.body.provider,
      ProfilePicture: req.body.photo,
      isEmailVerified: true,
    });
    if (newUser) {
      return res.status(200).json({
        success: true,
        googleData,
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
    if ((findUser.profileId === null) & (findUser.Email !== null)) {
      return res.status(200).json({
        success: true,
        msg: "user already exist with this email but profile not exist",
        user: true,
        googleData,
        User: findUser,
      });
    } else if (findUser.AccountType === "google.com") {
      const authtoken = jwt.sign(
        {
          userId: findUser._id,
          profileId: findUser.profileId,
          email: findUser.Email,
          ProfilePicture: findUser.ProfilePicture,
          role: findUser?.userRole,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        User: findUser,
        msg: "User Already exist with this email and profile also exist",
        authtoken,
      });
    } else if (findUser.AccountType === "email") {
      return res.status(400).json({
        success: false,
        msg: `this email is not linked as google account`,
      });
    }
  }
});

module.exports = router;
