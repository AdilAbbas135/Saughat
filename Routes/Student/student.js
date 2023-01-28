const express = require("express");
const AllUsersModel = require("../../Models/Allusers");
const StudentModel = require("../../Models/Student");
const router = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// FIND STUDENT AT POST REQUEST AND RETURNS STUDENT DATA
router.post("/", async (req, res) => {
  if (req.method === "POST") {
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    const student = await StudentModel.findOne({
      _id: token.profileId,
      userId: token.userId,
    });
    if (student) {
      res.status(200).json({ Success: true, student });
    } else {
      res.status(404).json({
        Success: false,
        msg: "No user Found with this userId and pofileId",
      });
    }
  } else {
    res.status(404).json({
      Success: false,
      msg: "You are only allowed to find user with post method",
    });
  }
});
// CREATE STUDENT PROFILE ACCOUNT
router.post("/createprofile", async (req, res) => {
  // console.log(req.body);
  const student = await StudentModel.findOne({ Email: req.body.Email });
  if (!student) {
    const newStudent = await StudentModel.create({
      FirstName: req.body.FirstName ? req.body.FirstName : "",
      LastName: req.body.LastName ? req.body.LastName : "",
      Email: req.body.Email,
      AccountType: req.body.provider,
      ProfilePicture: req.body.photo ? req.body.photo : "",
      userId: req.body.userId,
    });
    if (newStudent) {
      let updateUserModel = undefined;
      if (req.body.provider === "google.com") {
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newStudent.userId,
          {
            profileId: newStudent._id,
            userRole: "student",
          }
        );
      } else if (req.body.provider === "email") {
        // HERE WE WILL PUT THE PASSWORD FOR THE STUDENT
        const salt = await bcrypt.genSalt(10);
        const Password = await bcrypt.hash(req.body.Password, salt);
        updateUserModel = await AllUsersModel.findByIdAndUpdate(
          newStudent.userId,
          {
            profileId: newStudent._id,
            userRole: "student",
            Password: Password,
          }
        );
      }

      if (updateUserModel) {
        const authtoken = jwt.sign(
          {
            userId: newStudent.userId,
            profileId: newStudent._id,
            email: newStudent.Email,
            ProfilePicture: newStudent.ProfilePicture,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        return res.status(200).json({
          success: true,
          User: updateUserModel,
          Profile: newStudent,
          authtoken,
          msg: "student profile creaed and user model updated successfully",
        });
      } else {
        res.status(400).json({
          success: true,
          Profile: newStudent,
          msg: "profile created but user model was not updated",
        });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, msg: "Error in creating the user account" });
    }
  } else {
    const authtoken = jwt.sign(
      {
        userId: student.userId,
        ProfileId: student._id,
        email: student.Email,
        ProfilePicture: student.ProfilePicture,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      Profile: student,
      msg: "User Already exist with this email",
      authtoken,
    });
  }
});

// Update the student Account
router.post("/updatestudent", async (req, res) => {
  const student = await StudentModel.findOne({ _id: req.body._id });
  if (student) {
    const updatestudent = await student.update(
      {
        $set: {
          FirstName: req.body.FirstName,
          MiddleName: req.body.MiddleName,
          LastName: req.body.LastName,
          PhoneNo: req.body.PhoneNo,
        },
      },
      { new: true }
    );

    if (updatestudent) {
      return res.status(200).json({ Success: true, updatestudent });
    } else {
      return res.status(404).json({
        Success: false,
        msg: "error in updating the user account",
      });
    }
  } else {
    res
      .status(404)
      .json({ Success: false, msg: "No account found with this id" });
  }
});
module.exports = router;
