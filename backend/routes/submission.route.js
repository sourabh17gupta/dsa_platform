const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/user.auth");
const {
  getSubmissionsByQuestion,
  getSubmissionById,
  submitCode
} = require("../controllers/submission.controller");

/**
 *@route api/submission/:questionId
 *@description Get Submissions for a Specific Question
 *@access public
 */
router.get("/:questionId",authUser, getSubmissionsByQuestion);

/**
 *@route api/submission/getSingleSubmission/:id
 *@description Get Single Submission Details
 *@access public
 */
router.get("/getSingleSubmission/:id",authUser, getSubmissionById);

router.post("/submit",authUser,submitCode);

module.exports = router;