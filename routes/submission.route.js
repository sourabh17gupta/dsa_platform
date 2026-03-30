const express = require("express");
const router = express.Router();

const {
  getSubmissionsByQuestion,
  getSubmissionById,
} = require("../controllers/submission.controller");

/**
 *@route api/submission/:questionId
 *@description Get Submissions for a Specific Question
 *@access public
 */
router.get("/:questionId", getSubmissionsByQuestion);

/**
 *@route api/submission/getSingleSubmission/:id
 *@description Get Single Submission Details
 *@access public
 */
router.get("/getSingleSubmission/:id", getSubmissionById);

module.exports = router;