const user = require('./../models/userModel');
const question = require('./../models/questionModel');
const paper = require('./../models/paper');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');



exports.getLoginPage = function(req,res,next){
    res.status(200).render('login')
}

exports.getInstructionsPage =async function(req,res,next){
    const decoded  = await promisify(jwt.verify)(res.locals.cookie,process.env.JWT_SECRET);
    res.status(200).render('instruction',{id : decoded.id})
}

exports.getQuestionPage =async function(req,res,next){
    // console.log(req.params.paperId);
    // const newQuestion = await question.findOne({paperID :req.params.paperId});
    // console.log(newQuestion);
    // const newPaper = await paper.find();
    // console.log(newPaper);
    res.status(200).render('test', {question : res.locals.paper, nof : res.locals.nof, userId : res.locals.userId , response : res.locals.response});
}

exports.getResultPage = async function(req,res,next){
    // console.log(res.locals.toPass)
    res.render('result', {toPass : res.locals.toPass})
}

exports.getHomePage = async function(req,res,next){
    res.render('home')
}


exports.getSignUpPage = async function(req,res,next){
    res.render('signUp')
}


exports.getSuccessfulSignUpPage = async function(req,res,next){
    res.render('successfulSignUp');
}