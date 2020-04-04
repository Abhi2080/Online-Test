const question = require('./../models/questionModel');
const paper = require('./../models/paper');
const response = require('./../models/responseModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


exports.createQuestion  = async function(req,res,next){

    name = req.body.name;
    description = req.body.description;
    paperId = req.params.qno;
    paperID = paperId *1;
    testDate = req.body.testDate;
    testTime = req.body.testTime;
    
    await question.create({
        name : req.body.name,
        nof : req.body.nof,
    description : req.body.description,
    paperId : paperID,
    testDate : req.body.testDate,
    testTime : req.body.testTime
    })



    res.end();
}

exports.createPaper = async function (req,res,next){
    qno = req.params.qno *1;
    pno = req.params.pno *1;
    await paper.create({
        paperId : qno,
        question : req.body.question,
        option : req.body.option,
        answer : req.body.answer,
        qno : pno
    })
    next();
}
exports.getPaper = async function(req,res,next){
    const decoded  = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
    pid = req.query.pid *1;
    qno = req.query.qno *1;


    const newPaper =await paper.findOne({qno : qno , paperId : pid});
    const newQuestion = await question.findOne({paperId : pid});
    const newResponse = await response.findOne({studentId : req.query.id,paperId : pid , qno : qno  });
    res.locals.paper = newPaper;
    res.locals.nof = newQuestion.nof;
    res.locals.userId = decoded.id;
    if(newResponse === null){
        res.locals.response = [0,0,0,0];
    }else if(newResponse === undefined){
        res.locals.response = [0,0,0,0];
    }else{
        res.locals.response = newResponse.response
    }
    next();
}


exports.timeVerificationStart = async function(req, res ,next){
    pid = req.query.pid *1 ;
    const newQuestion = await question.findOne({ paperId : pid});

    var re = newQuestion.testDate.split('/');
    a = re[0];
    b = re[1];
    re[0] = b;
    re[1] = a;
    var reformedDate = re;

    var questionTime = `${reformedDate} ${newQuestion.testTime}`;
    var questionTimeSec = new Date(questionTime);
    var questionTimeSeconds  =questionTimeSec.getTime();
    

    var timeNow = Date.now();
    next();
    // if(timeNow < questionTimeSeconds ){
    //     res.render('timeError')
    // }else{
    //     next();
    // }


}


exports.timeVerificationEnd = async function(req,res,next){
    pid = req.query.pid *1 ;
    const newQuestion = await question.findOne({ paperId : pid});

    var re = newQuestion.testDate.split('/');
    a = re[0];
    b = re[1];
    re[0] = b;
    re[1] = a;
    var reformedDate = re;

    var questionTime = `${reformedDate} ${newQuestion.testTime}`;
    var questionTimeSec = new Date(questionTime);
    var questionTimeSeconds  =questionTimeSec.getTime();
    var questionEndTime = questionTimeSeconds + 3600000;

    var timeNow = Date.now();
    next;

    // if(timeNow <= questionEndTime){
    //     next();
    // }else{
    //     res.render('endTestError')
    // }
}

