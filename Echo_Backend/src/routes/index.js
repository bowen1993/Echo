import express from 'express';
import questionAction from '../services/questionAction'
import answerAction from '../services/answerAction'

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({
    title: 'Echo',
  });
});


// test code
router.get('/test', (req, res, next) => {
  // create question
  // questionAction.createQuestion('this is a test question?' ,'596dc52e4d42a7d3a0202fc6').then( result =>{
  //   res.json({
  //     isSuccess: result
  //   })
  // })
  // get question info
  // questionAction.getQuestionInfo('596dc82469083ad500211cae').then(info => {
  //   res.json(info)
  // })
  // add answer
  answerAction.addAnswer2Question('yes is it', '596dc82369083ad500211cad', '596dc52e4d42a7d3a0202fc6').then(result =>{
    res.json({
      result:result
    })
  })
});
module.exports = router;
