const QuestionModel = require('../models/question.model');
const testcaseModel = require('../models/testcase.model');


/**
 * @name questionCreatecontroller
 * @description route to push question in database
 * @access private
 */

exports.questionCreatecontroller = async(req,res)=>{
    try{
       const {questionNumber,heading,type,description,constraints,topic,testCases} = req.body;
       if(!questionNumber || !heading || !type || !description || !constraints || !topic || !testCases){
        res.status(401).json({
           message:"data is not their something is missing " + err,
        })
       }
       const savedQuestion = await QuestionModel.create({
         questionNumber,
         heading,
         type,
         description,
         constraints,
         topic
       });

       const qId = savedQuestion._id;
       for(const testcase of testCases){
           await testcaseModel.create({
            questionId:qId,
            input:testcase.input,
            output:testcase.output,
            image:testcase.image,
            explanation:testcase.explanation,
           })
       }

       res.status(201).jaon({
        message:"question saved successfully"
       })

    }
    catch(err){
        res.status(500).json({
           message:"error while creating new question in database "+err,
        })
    }
}