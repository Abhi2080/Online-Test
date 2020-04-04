const response = require('./../models/responseModel');
const user = require('./../models/userModel');
const question = require('./../models/questionModel');
const paper = require('./../models/paper');


exports.saveResponses = async function(req, res , next){
    A = req.query.A * 1
    B = req.query.B * 1
    C = req.query.C * 1
    D = req.query.D * 1
    const newUser = await user.findById(req.query.id)

    const oldResponse = await response.find({ paperId : req.query.pid, qno : req.query.qno, studentId : req.query.id});

    if(oldResponse.length === 0){
        const newResponse = await response.create({
            paperId : req.query.pid,
            qno : req.query.qno,
            rollNo : newUser.rollNo,
            response : [A, B ,C ,D],
            studentId : req.query.id
        })
    }else{
        const newResponse = await response.updateOne({paperId : req.query.pid , qno : req.query.qno ,studentId : req.query.id},{response : [A, B ,C ,D]} )
    }
    res.end();
}



exports.getScore = async function(req,res,next){
    pid = req.query.pid;
    qno = req.query.qno;
    const newUser = await user.findById(req.query.id);
    const newQuestion = await question.findOne({paperId : pid});
    
    var numberOfQuestion = newQuestion.nof;
    table = [];
    var totalScore = 0;
    
    for(i=1;i<=numberOfQuestion; i++ ){
        var score = 0;
        var answerOfEachQuestion = await paper.findOne({paperId : req.query.pid, qno : i},{ answer : true , _id : false}).select('answer')
        answerOfEachQuestion = answerOfEachQuestion.answer;
        if( answerOfEachQuestion.includes("A") ){
            ansA = 1
        }else{ ansA =0}
        if( answerOfEachQuestion.includes("B") ){
            ansB = 1
        }else{ ansB =0}
        if( answerOfEachQuestion.includes("C") ){
            ansC = 1
        }else{ ansC =0}
        if( answerOfEachQuestion.includes("D") ){
            ansD = 1
        }else{ ansD =0}
        
        var studentResponse = await response.findOne({paperId : req.query.pid, qno : i , studentId : req.query.id}, {response : true, _id:false});
        if(studentResponse === null || studentResponse === undefined){
            score = 0
        }else{
            var responseArray = studentResponse.response;
            if( ansA === responseArray[0] && ansB === responseArray[1] && ansC ===responseArray[2] && ansD === responseArray[3]  ){
                score = score+4
            }else{
                if(ansA === responseArray[0] && responseArray[0]===1){ score = score+1}
                if(ansB === responseArray[1] && responseArray[1]===1){ score = score+1}
                if(ansC === responseArray[2] && responseArray[2]===1){ score = score+1}
                if(ansD === responseArray[3] && responseArray[3]===1){ score = score+1}

                if(ansA != responseArray[0] && responseArray[0]===1){score = -1}
                if(ansB != responseArray[1] && responseArray[1]===1){score = -1}
                if(ansC != responseArray[2] && responseArray[2]===1){score = -1}
                if(ansD != responseArray[3] && responseArray[3]===1){score = -1}
            }
        }
        
        totalScore = totalScore + score;
        table.push([i,score]);
        
    }

    const toPass = {
        name : newUser.name,
        rollNo : newUser.rollNo,
        nof : newQuestion.nof,
        table : table,
        totalScore : totalScore
    }
    res.locals.toPass = toPass;
    next();
}