const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    rollNo : {
        type : Number,
        required : true
    },
    qno : {
        type : Number
    },
    paperId : Number,
    response : [Number],
    studentId : String
})


const Response = mongoose.model('Response', responseSchema);


module.exports = Response;