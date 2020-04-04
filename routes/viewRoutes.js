const express = require('express');
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController')
const questionController = require('./../controllers/questionController')
const responseController = require('./../controllers/responseController');

const router  = express.Router();

router.route('/home')
    .get(viewController.getHomePage)
    



router.route('/login').get(viewController.getLoginPage).post(authController.login,viewController.getInstructionsPage)

router
.route('/')////   /?id= &pid= &qno=
.get(questionController.timeVerificationStart, questionController.timeVerificationEnd  ,authController.isLoggedIn, questionController.getPaper, viewController.getQuestionPage)
.post(authController.isLoggedIn , questionController.timeVerificationEnd , responseController.saveResponses  );


router.route('/result') ////   /?id= &pid= 
.get(authController.isLoggedIn, responseController.getScore , viewController.getResultPage)




// router.route('/test/:Id/:id').get(authController.isLoggedIn,questionController.getPaper,viewController.getQuestionPage);
// router.route('/login').get(authController.isloggedIn);


module.exports = router;