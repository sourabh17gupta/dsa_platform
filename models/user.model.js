const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:[true,"username alredy exist"]
    },
    email:{
       type:String,
       required:true,
       unique:[true,"email alredy exist"],
    },
    password:{
       type:String,
       //required:true,
    },
    googleId: {
       type: String,
    },
    questionCompleted:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"question"
        }
    ]
});

const user = mongoose.model('user',userSchema);
module.exports = user;