const Submission = require("../models/submission.model");
const TestCaseModel = require("../models/testcase.model");
const judge0 = require("../services/judgeServices");
const { getCache, setCache, deleteCache } = require("../services/cacheService");

/**
 *@name getSubmissionsByQuestion
 *@description Get Submissions for a Specific Question
 *@access public
 */
const getSubmissionsByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const userId = req.decoded.userid;

    const cacheKey = `submissions:${userId}:${questionId}`;

    // 1️⃣ Check Redis first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({ success: true, submissions: cached });
    }

    const submissions = await Submission.find({
      questionId,
      userId,
    })
      .sort({ createdAt: -1 });

    // 2️⃣ Store in Redis
    await setCache(cacheKey, submissions, 60 * 2);

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

    const cacheKey = `submission:${id}`;

    // Check Redis first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({ success: true, submission: cached });
    }

    const submission = await Submission.findById(id)
      .populate({
        path: "testcase.testcaseId",
        model: "testcase",
        select: "input output explanation"
      })
      .select("status code testcase currOutput");

    // Store in Redis
    await setCache(cacheKey, submission, 60 * 1);

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
            currOutput: response.output,
          },
        });

        //  Invalidate list cache
        await deleteCache(`submissions:${userId}:${questionId}`);

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

    // ♻️ Invalidate list cache
    await deleteCache(`submissions:${userId}:${questionId}`);

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


const submissionByUser = async(req,res)=>{
  try{
     const userId = req.decoded.userid;
     console.log(userId);
     const cacheKey = `submissions:user:${userId}`;

    // 1️⃣ Check Redis cache
    const cached = await getCache(cacheKey);
    if (cached) {
      console.log("⚡ CACHE HIT (user submissions)");
      return res.status(200).json({
        success: true,
        submissions: cached,
      });
    }
     const submissions = await Submission.find({userId});
     console.log(submissions);
     // 3️⃣ Store in Redis (TTL = 2 min)
    await setCache(cacheKey, submissions, 60 * 2);
     return res.status(200).json({
      success:"true",
      submissions
     })
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
module.exports = { getSubmissionsByQuestion,getSubmissionById,submitCode,submissionByUser };