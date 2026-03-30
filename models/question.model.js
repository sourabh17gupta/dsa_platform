const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber:{
        type:Number,
        unique:true,
    },
    heading:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum : ["easy","medium","hard"],
    },
    description:{
        type:String,
        required:true,
    },
    constraints:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    }

});

const question = mongoose.model('question',questionSchema);
module.exports = question;