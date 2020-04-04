const express =  require('express');


const questionController = require('./../controllers/questionController');

const router  = express.Router();

router.route('/:qno').post(questionController.createQuestion);
router.route('/paper/:qno/:pno').post(questionController.createPaper);
// router.route('/:qno/:pno').get(questionController.getPaper);


module.exports = router;