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
            required: true
        },    
        expected: { type: String },
    }
});

const submission = mongoose.model('submission',submissionSchema);
module.exports = submission;