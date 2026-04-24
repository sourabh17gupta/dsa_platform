const express = require("express");
const router = express.Router();

const { createInterview, getInterview } = require("../controllers/interview.controller");

router.post("/create", createInterview);
router.get("/:sessionId", getInterview);

module.exports = router;