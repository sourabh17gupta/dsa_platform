const Submission = require("../models/submission.model");
const TestCaseModel = require("../models/testcase.model");
const judge0 = require("../services/judgeServices");

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
      .populate({
        path: "testcase.testcaseId",
        model: "testcase",
        select: "input output explanation"
      })
      .select("status code testcase currOutput");

    res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/**
 * @name submitCode
 * @description submit code in judge0 and return response
 * @access private
 */

const submitCode = async (req, res) => {
  try {
    const { questionId, code, languageId } = req.body;
    const userId = "69cb7325b6ed85b3de6f48b0";

    const testCases = await TestCaseModel.find({ questionId });
    const totalCases = testCases.length;
    let passed = 0;

    for (const tc of testCases) {
      const response = await judge0({
        code,
        languageId,
        input: tc.input,
      });

      const output = (response.output || "").trim();
      const expected = tc.output.trim();
      const error = (response.error || "").trim();

      // If error OR wrong output
      if (error.length > 0 || output !== expected) {
        await Submission.create({
          questionId,
          userId,
          status: response.status === "Accepted" ? "Wrong Answer" : response.status,
          code,
          languageId,
          totalCases,
          totalPassCases: passed,
          error,
          testcase: {
            testcaseId: tc._id,
            expected: response.output,
          },
        });

        return res.status(200).json({
          success:"false",
          message: "code will not pass testcase",
          result: {
            code,
            input: tc.input,
            expected: tc.output,
            output: response.output,
            error: response.error,
            status:response.status=="Accepted"?"Wrong Answer":response.status,
          },
        });
      }

      passed++;
    }

    // If all passed
    await Submission.create({
      questionId,
      userId,
      status: "Accepted",
      code,
      languageId,
      totalCases,
      totalPassCases: passed,
    });

    return res.status(200).json({
      success:"true",
      message: "code will pass on all testcases",
      result: {
        code,
        input: "",
        expected: "",
        output: "",
        error: "",
      },
    });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: "technical server error",
    });
  }
};

module.exports = { getSubmissionsByQuestion,getSubmissionById,submitCode };