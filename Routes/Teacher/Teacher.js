const express = require("express");
const TeacherModel = require("../../Models/Teacher/Teacher");
const router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AllUsersModel = require("../../Models/Allusers");
const VerifyToken = require("../../Middlewear/VerifyToken");

// FIND Teacher AT POST REQUEST AND RETURNS Teacher DATA
router.post("/", VerifyToken, async (req, res) => {
  if (req.method === "POST") {
    const Teacher = await TeacherModel.findOne({
      _id: req.user?.profileId,
      userId: req.user?.userId,
    });
    if (Teacher) {
      res.status(200).json({ Success: true, Teacher });
    } else {
      res.status(404).json({
        Success: false,
        error: "Access Denied",
      });
    }
  } else {
    res.status(404).json({
      Success: false,
      error: "Access Denied",
    });
  }
});

// CREATE Teacher PROFILE ACCOUNT
router.post("/createprofile", async (req, res) => {
  // console.log(req.body);
  const Teacher = await TeacherModel.findOne({ Email: req.body.Email });
  if (!Teacher) {
    const newTeacher = await TeacherModel.create({
      FirstName: req.body.FirstName ? req.body.FirstName : "",
      LastName: req.body.LastName ? req.body.LastName : "",
      Email: req.body.Email,
      AccountType: req.body.provider,
      ProfilePicture: req.body.photo ? req.body.photo : "",
      userId: req.body.userId,
    });
    if (newTeacher) {
      let updateUserModel = undefined;
      if (req.body.provider === "google.com") {
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newTeacher.userId,
          {
            profileId: newTeacher._id,
            userRole: "teacher",
          }
        );
      } else if (req.body.provider === "email") {
        // HERE WE WILL PUT THE PASSWORD FOR THE STUDENT
        const salt = await bcrypt.genSalt(10);
        const Password = await bcrypt.hash(req.body.Password, salt);
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newTeacher.userId,
          {
            profileId: newTeacher._id,
            userRole: "teacher",
            Password: Password,
          }
        );
      }
      if (updateUserModel) {
        const authtoken = jwt.sign(
          {
            userId: newTeacher.userId,
            profileId: newTeacher._id,
            email: newTeacher.Email,
            ProfilePicture: newTeacher.ProfilePicture,
            role: "teacher",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          success: true,
          User: updateUserModel,
          Profile: newTeacher,
          authtoken,
          msg: "Teacher profile creaed and user model updated successfully",
        });
      } else {
        res.status(400).json({
          success: true,
          Profile: newTeacher,
          error: "profile created but user model was not updated",
        });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Error in creating the user account" });
    }
  } else {
    const authtoken = jwt.sign(
      {
        userId: Teacher.userId,
        ProfileId: Teacher._id,
        email: Teacher.Email,
        ProfilePicture: Teacher.ProfilePicture,
        role: "teacher",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      Profile: Teacher,
      msg: "User Already exist with this email",
      authtoken,
    });
  }
});
module.exports = router;
