const express = require("express");
const StudentModel = require("../../Models/Student");
const router = express.Router();

// FIND STUDENT AT POST REQUEST AND RETURNS STUDENT DATA
router.post("/", async (req, res) => {
  if (req.method === "POST") {
    const student = await StudentModel.findOne({
      _id: req.body.userId,
      Email: req.body.email,
    });
    if (student) {
      res.status(200).json({ Success: true, student });
    } else {
      res
        .status(404)
        .json({ Success: false, msg: "No user Found with this id and email" });
    }
  } else {
    res.status(404).json({
      Success: false,
      msg: "You are only allowed to find user with post method",
    });
  }
});

// Update the student Account
router.post("/updatestudent", async (req, res) => {
  // UPDATING THE USER GOOGLE ACCOUNT
  if (req.body.AccountType == "google.com") {
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
  }
});
module.exports = router;
