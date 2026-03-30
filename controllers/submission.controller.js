const Submission = require("../models/submission.model");

/**
 *@name getSubmissionsByQuestion
 *@description Get Submissions for a Specific Question
 *@access public
 */
const getSubmissionsByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const userId = req.decoded.userid;

    const submissions = await Submission.find({
      questionId,
      userId,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 *@name getSubmissionById
 *@description Get Single Submission Details
 *@access public
 */
const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id)
      .populate("questionId", "status code testcase");

    res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getSubmissionsByQuestion,getSubmissionById };