const mongoose = require('mongoose');
const validator = require('validator');



const questionSchema  =new mongoose.Schema({
    name : {
        type : String,
        required : [true ,'a question paper should have a name']
    },
    description : String,
    paperId : {
        type : Number,
        required : [true , ' a paper should have a id'] ,
        unique : true
    },
    nof : Number,   
    dateModified : String,
    timeMOdified: String,
    testDate : String,
    testTime : String
    
})

questionSchema.pre('save',async function(next){
    var d = new Date();
    this.dateModified =await d.toLocaleDateString();
    // this.timeMOdified =await d.toLocaleTimeString();
    var n = d.toTimeString();
    n = n.split(' ');
    this.timeMOdified = n[0]
    
})

const question = mongoose.model('question',questionSchema);

module.exports = question;