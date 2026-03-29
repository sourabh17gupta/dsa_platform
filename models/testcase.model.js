const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"question"
    },
    input:{
        type:String,
        required:true,
    },
    images:{
        type:[String],
        default:[]
    },
    output:{
        type:String,
        required:true,
    },
    explanation:{
        type:String,
    }
});

const testcase = mongoose.model('testcase',testcaseSchema);
module.exports = testcase;