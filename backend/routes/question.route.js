const express = require("express");
const router = express.Router();

const {
    questionCreatecontroller,
    singleQuestionController,
    getAllQuestionController
} = require("../controllers/question.controller");

const authUser = require("../middlewares/user.auth");


/**
 * @route /api/question/addQuestion
 * @description route to push question in database
 * @access private
 */
router.post("/addQuestion",authUser,questionCreatecontroller);

/**
 * @route /api/question/singleQuestin/:questionId
 * @description route to get data of question in database
 * @access public
 */
router.get("/singleQuestion/:questionId",singleQuestionController);

/**
 * @route /api/question/getAllQuestion
 * @description route to question id and its its heading
 * @access public
 */
router.get("/getAllQuestion",getAllQuestionController);

module.exports = router;