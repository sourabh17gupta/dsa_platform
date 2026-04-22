const QuestionModel = require('../models/question.model');
const testcaseModel = require('../models/testcase.model');
const { getCache, setCache, deleteCache } = require('../services/cacheService');

// TTLs
const ALL_QUESTIONS_TTL  = 60 * 10; // 10 min — list changes only when admin adds a question
const SINGLE_QUESTION_TTL = 60 * 60; // 1 hour — question data almost never changes

/**
 * @name questionCreatecontroller
 * @description route to push question in database
 * @access private
 */
exports.questionCreatecontroller = async (req, res) => {
  try {
    const { questionNumber, heading, type, description, constraints, topic, testCases } = req.body;

    if (!questionNumber || !heading || !type || !description || !constraints || !topic || !testCases) {
      return res.status(400).json({
        message: "data is not there, something is missing",
      });
    }

    const savedQuestion = await QuestionModel.create({
      questionNumber,
      heading,
      type,
      description,
      constraints,
      topic,
    });

    const qId = savedQuestion._id;

    for (const testcase of testCases) {
      await testcaseModel.create({
        questionId: qId,
        input: testcase.input,
        output: testcase.output,
        image: testcase?.image || [],
        explanation: testcase.explanation || "",
      });
    }

    // ♻️ New question added → invalidate the all-questions list cache
    await deleteCache("questions:all");

    res.status(201).json({
      message: "question saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "error while creating new question in database " + err,
    });
  }
};

/**
 * @name singleQuestionController
 * @description route to get data of single question + its testcases
 * @access public
 */
exports.singleQuestionController = async (req, res) => {
  try {
    const { questionId } = req.params;
    const cacheKey = `question:${questionId}`;

    // 1️⃣ Check Redis first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        message: "question data fetch successfully",
        data: cached.data,
        testcases: cached.testcases,
        fromCache: true,
      });
    }

    // 2️⃣ Cache miss → hit MongoDB
    const data = await QuestionModel.findById(questionId);
    const testcases = await testcaseModel.find({ questionId });

    if (!data) {
      return res.status(404).json({ message: "Question not found" });
    }

    // 3️⃣ Store both question + testcases together under one key
    await setCache(cacheKey, { data, testcases }, SINGLE_QUESTION_TTL);

    res.status(200).json({
      message: "question data fetch successfully",
      data,
      testcases,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while fetching question from database " + err,
    });
  }
};

/**
 * @name getAllQuestionController
 * @description route to get all question id, heading, type
 * @access public
 */
exports.getAllQuestionController = async (req, res) => {
  try {
    const cacheKey = "questions:all";

    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        message: "get all question",
        data: cached,
        fromCache: true,
      });
    }

    const data = await QuestionModel.find().select("_id heading type topic");

    await setCache(cacheKey, data, ALL_QUESTIONS_TTL);

    res.status(200).json({
      message: "get all question",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while fetching all questions " + err,
    });
  }
};