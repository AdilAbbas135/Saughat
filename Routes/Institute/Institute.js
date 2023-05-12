const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AllUsersModel = require("../../Models/Allusers");
const VerifyToken = require("../../Middlewear/VerifyToken");
const InstituteModel = require("../../Models/Institute/Institute");

// FIND Teacher AT POST REQUEST AND RETURNS Teacher DATA
router.post("/", VerifyToken, async (req, res) => {
  if (req.method === "POST") {
    try {
      // console.log(req.user);
      const Institute = await InstituteModel.findOne({
        _id: req.user?.profileId,
        userId: req.user?.userId,
      });
      if (Institute) {
        return res.status(200).json({ Success: true, Institute });
      } else {
        return res.status(404).json({
          Success: false,
          error: "Access Denied",
          msg: "No Such User found in Database",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  } else {
    return res.status(404).json({
      Success: false,
      error: "Access Denied",
    });
  }
});

// CREATE Instiute PROFILE ACCOUNT
router.post("/createprofile", async (req, res) => {
  // console.log(req.body);
  // try {
  const Institute = await InstituteModel.findOne({ Email: req.body.Email });
  if (!Institute) {
    const newInstitute = await InstituteModel.create({
      Name: req.body.FirstName + " " + req.body.LastName,
      Email: req.body.Email,
      AccountType: req.body.provider ? req.body.provider : "Not Provided",
      ProfilePicture: req.body.photo ? req.body.photo : "",
      userId: req.body.userId,
    });
    if (newInstitute) {
      let updateUserModel = undefined;
      if (req.body.provider === "google.com") {
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newInstitute.userId,
          {
            profileId: newInstitute._id,
            userRole: "institute",
          }
        );
      } else if (req.body.provider === "email") {
        // HERE WE WILL PUT THE PASSWORD FOR THE STUDENT
        const salt = await bcrypt.genSalt(10);
        const Password = await bcrypt.hash(req.body.Password, salt);
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newInstitute.userId,
          {
            profileId: newInstitute._id,
            userRole: "institute",
            Password: Password,
          }
        );
      }
      if (updateUserModel) {
        const authtoken = jwt.sign(
          {
            userId: newInstitute.userId,
            profileId: newInstitute._id,
            email: newInstitute.Email,
            ProfilePicture: newInstitute.ProfilePicture,
            role: "Institute",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          success: true,
          User: updateUserModel,
          Profile: newInstitute,
          authtoken,
          msg: "Institute profile creaed and user model updated successfully",
        });
      } else {
        res.status(400).json({
          success: true,
          Profile: newInstitute,
          error: "profile created but user model was not updated",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        error: "Error in creating the user account",
      });
    }
  } else {
    const authtoken = jwt.sign(
      {
        userId: Institute.userId,
        ProfileId: Institute._id,
        email: Institute.Email,
        ProfilePicture: Institute.ProfilePicture,
        role: "institute",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      Profile: Institute,
      msg: "User Already exist with this email",
      authtoken,
    });
  }
  // } catch (error) {
  //   return res.status(500).json({ error: "Internal Server Error" });
  // }
});
module.exports = router;
