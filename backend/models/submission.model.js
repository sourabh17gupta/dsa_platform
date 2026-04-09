const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"question",
        required:true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" ,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    },
    testcase: {
        testcaseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "testcase",
        },    
        currOutput: { type: String },
    },
    totalPassCases:{
        type:Number
    },
    totalCases:{
        type:Number
    },
    error:{
        type:String,
        default : "",
    },
    languageId:{
        type:Number,
        required:true,
    }

},{timestamps:true});

const submission = mongoose.model('submission',submissionSchema);
module.exports = submission;