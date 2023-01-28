const express = require("express");
const QaHubModel = require("../../Models/Qahub");
const StudentModel = require("../../Models/Student");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Route 1 : GET ALL QUESTIONS AGAINST A USERID
router.post("/findquestions", async (req, res) => {
  if (req.method === "POST") {
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    const student = await StudentModel.findOne({
      _id: token.profileId,
      userId: token.userId,
    });
    if (student) {
      const questions = await QaHubModel.find({
        StudenId: student._id,
      }).sort({ createdAt: -1 });
      return res.status(200).json({ Success: true, questions });
    } else {
      return res
        .status(404)
        .json({ Success: false, msg: "No user Found with this id and email" });
    }
  } else {
    return res.status(404).json({
      Success: false,
      msg: "You are only allowed to get all questions with post method",
    });
  }
});

// ROUTE2 : POST A QUESTION AGAINST A USER
router.post("/postquestion", async (req, res) => {
  if (req.method === "POST") {
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    const student = await StudentModel.findOne({
      _id: token.profileId,
      userId: token.userId,
    });
    if (student) {
      const question = await QaHubModel.create({
        Title: req.body.questiondata.Title,
        Description: req.body.questiondata.Description,
        isActive: req.body.questiondata.Status === "active" ? true : false,
        StudentId: student._id,
      });
      if (question) {
        const updatestudent = await student.update(
          {
            $push: { Questions: question._id },
          },
          { new: true, upsert: true }
        );
        if (updatestudent) {
          return res.status(200).json({
            Success: true,
            msg: "Question posted and user table updated successfully",
            question,
            updatestudent,
          });
        } else {
          return res.status(404).json({
            Success: false,
            msg: "error in posting the question id in student table",
          });
        }
      } else {
        return res
          .status(404)
          .json({ Success: false, msg: "error in posting the question" });
      }
    } else {
      res
        .status(404)
        .json({ Success: false, msg: "No user Found with this id and email" });
    }
  } else {
    res.status(404).json({
      Success: false,
      msg: "You are only allowed to post questions with post method",
    });
  }
});

//ROUTE3: DELETE A QUESTION THAT A USER ADDS
router.post("/deletequestion", async (req, res) => {
  const token = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
  const question = await QaHubModel.findById(req.body.questionid);
  if (question) {
    const deletequestion = await QaHubModel.findByIdAndDelete(
      req.body.questionid
    );
    if (deletequestion) {
      const findstudent = await StudentModel.findById(token.profileId);
      if (findstudent) {
        const updatestudent = await findstudent.update({
          $pull: { Questions: question._id },
        });
        if (updatestudent) {
          return res.status(200).json({
            Success: true,
            msg: "question deleted and user account updated successfully",
          });
        } else {
          return res.status(200).json({
            Success: false,
            msg: "question deleted but user not updated and question id is mention that is not deleted",
            questionid: question._id,
          });
        }
      } else {
        return res.status(404).json({
          Success: false,
          msg: "no such student is found with this id",
        });
      }
    } else {
      return res.status(404).json({
        Success: false,
        msg: "Error in Deleting he question from database",
      });
    }
  } else {
    return res
      .status(404)
      .json({ Success: false, msg: "no such question found in the database" });
  }
});

module.exports = router;
