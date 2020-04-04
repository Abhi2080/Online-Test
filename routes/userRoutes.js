const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const viewController = require('./../controllers/viewController')
const router  = express.Router();


router.route('/signup')
    .post(authController.signup, authController.logout, viewController.getSuccessfulSignUpPage)
    .get(viewController.getSignUpPage)
// router.route('/login').post(authController.login);



// router
//     .route('/')
//     .get()
//     .post(userController.getAllUsers)



module.exports = router