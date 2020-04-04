const mongoose = require('mongoose');
const validator = require('validator');


const paperSchema = new mongoose.Schema({
    paperId : {
        type : Number,
        required : true
    },
    qno : Number,
    question : {
        type : String
    },
    option : {
        type : [String]
    },
    answer : {
        type : [String],
        select: false
    }
})

const paper = mongoose.model('paper', paperSchema);


module.exports = paper;