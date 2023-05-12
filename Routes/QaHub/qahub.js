const express = require("express");
const QaHubModel = require("../../Models/Qahub");
const StudentModel = require("../../Models/HallManager");
const router = express.Router();
const jwt = require("jsonwebtoken");
const VerifyToken = require("../../Middlewear/VerifyToken");
const { mongo, default: mongoose } = require("mongoose");

//  Route 1:  GET ALL THE QUESTION FOR MAIN QAHUB PAGE
//  Route 2 : GET Single Question Against its id
//  Route 3 : GET ALL QUESTIONS AGAINST A Specific USERID
//  ROUTE 4 : POST A QUESTION AGAINST A USER
//  ROUTE 5: DELETE A QUESTION THAT A USER ADDS
//  Route 6: Apply for a question in qahub as a teacher
//  Route 7: Get a Single Question Details Along with all the details of its applicants

//Route 1:  GET ALL THE QUESTION FOR MAIN QAHUB PAGE
router.get("/allquestions", async (req, res) => {
  try {
    const totalQuestions = await QaHubModel.count({ isActive: true });
    const questions = await QaHubModel.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "StudentId",
          foreignField: "_id",
          as: "Student",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res
      .status(200)
      .json({ success: true, questions, total: totalQuestions });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Error in Getting the questions from database",
    });
  }
});

// Route 2 : GET Single Question Against its id
router.get("/FindQuestion", async (req, res) => {
  try {
    const question = await QaHubModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
      {
        $lookup: {
          from: "students",
          localField: "StudentId",
          foreignField: "_id",
          as: "Student",
        },
      },
    ]);
    if (question) {
      return res.status(200).json({ success: true, question });
    } else {
      return res.status(400).json({
        success: false,
        error: "There is not a such question with this id in database",
      });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: "Error in Getting the Question " });
  }
});

// Route 3 : GET ALL QUESTIONS AGAINST A Specific USERID
router.post("/findquestions", async (req, res) => {
  if (req.method === "POST") {
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    const student = await StudentModel.findOne({
      _id: token.profileId,
      userId: token.userId,
    });
    if (student) {
      const questions = await QaHubModel.find({
        StudentId: student._id,
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

// ROUTE 4 : POST A QUESTION AGAINST A USER
router.post("/postquestion", VerifyToken, async (req, res) => {
  if (req.method === "POST") {
    const student = await StudentModel.findOne({
      _id: req.user?.profileId,
      userId: req.user?.userId,
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

//ROUTE 5: DELETE A QUESTION THAT A USER ADDS
router.post("/deletequestion", VerifyToken, async (req, res) => {
  const question = await QaHubModel.findById(req.body.questionid);
  if (question) {
    const deletequestion = await QaHubModel.findByIdAndDelete(
      req.body.questionid
    );
    if (deletequestion) {
      const findstudent = await StudentModel.findById(req.user?.profileId);
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

//route 6: Apply for a question in qahub as a teacher
router.post("/applyForQaHub", VerifyToken, async (req, res) => {
  const id = req.query.id;
  try {
    // const updateQuestion =await QaHubModel.findByIdAndUpdate(id,{})
    const FindQuestion = await QaHubModel.findById(id);
    if (FindQuestion) {
      const ProfileId = req.user.profileId;
      await FindQuestion.update({
        $push: { PeopleApplied: ProfileId },
      });
      return res
        .status(200)
        .json({ success: true, msg: "Applied to question Successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "No such question Found with this id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: "Something Went Wrong durating Application",
    });
  }
});
//  Route 7: Get a Single Question Details Along with all the details of its applicants
router.post("/FindQuestionDetails/:id", async (req, res) => {
  try {
    const question = await QaHubModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "PeopleApplied",
          foreignField: "_id",
          as: "Teachers_Applied",
        },
      },
      {
        $project: {
          StudentId: 0,
          isActive: 0,
          PeopleApplied: 0,
          "Teachers_Applied.AccountType": 0,
          "Teachers_Applied.Discussion": 0,
          "Teachers_Applied.Rating": 0,
          "Teachers_Applied.Tutions": 0,
        },
      },
    ]);
    return res.status(200).json({ success: true, question: question[0] });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: "Something went wrong! Try again" });
  }
});

module.exports = router;
