const express = require("express");
const router = express.Router();
const StudentModel = require("../../Models/Student");
var jwt = require("jsonwebtoken");

// Route 1: Creation of Student Account while google signin and it is done
router.post("/", async (req, res) => {
  const student = await StudentModel.findOne({ Email: req.body.email });
  if (!student) {
    const FirstLastName = req.body.displayName.split(" ");
    const newStudent = await StudentModel.create({
      Username: req.body.email,
      FirstName: FirstLastName[0],
      LastName: FirstLastName[1] ? FirstLastName[1] : "",
      Email: req.body.email,
      AccountType: req.body.provider,
      ProfilePicture: req.body.photo ? req.body.photo : "",
    });

    if (newStudent) {
      // env.config();
      const authtoken = jwt.sign(
        {
          userId: newStudent._id,
          email: newStudent.Email,
          image: newStudent.ProfilePicture,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ success: true, authtoken });
    } else {
      return res
        .status(404)
        .json({ success: false, msg: "Error in creating the user account" });
    }
  } else {
    const authtoken = jwt.sign(
      {
        userId: student._id,
        email: student.Email,
        image: student.ProfilePicture,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .cookie("authtoken", authtoken, { httpOnly: true })
      .json({
        success: true,
        msg: "User Already exist with this email",
        authtoken,
      });
  }
});

module.exports = router;
