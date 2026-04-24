const InterviewSession = require("../models/InterviewSession.model");
const { v4: uuidv4 } = require("uuid");
const { getCache, setCache, deleteCache } = require('../services/cacheService');

exports.createInterview = async (req, res) => {
  try {
    const { interviewerId, questionIds } = req.body;

    if (!questionIds || questionIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Select at least one question"
      });
    }

    const sessionId = uuidv4();

    const session = await InterviewSession.create({
      sessionId,
      interviewerId,
      questionIds
    });

    const interviewLink = `${process.env.FRONTEND_URL}/interview/${sessionId}`;
    const cacheKey = `interview:${sessionId}`;
    await setCache(cacheKey, session, 3600);    

    res.status(200).json({
      success: true,
      sessionId,
      interviewLink
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.getInterview = async (req, res) => {
  try {    
    const { sessionId } = req.params;
    const cacheKey = `interview:${sessionId}`;

    // ✅ 1. Check cache
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        source: "cache"
      });
    }    

    const session = await InterviewSession.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    await setCache(cacheKey, session, 3600);

    res.status(200).json({
      success: true,
      data: session
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};