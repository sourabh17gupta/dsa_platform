const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  interviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  questionIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question"
    }
  ],
  status: {
    type: String,
    enum: ["active", "ended"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);