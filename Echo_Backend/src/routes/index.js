import express from 'express';
import questionAction from '../services/questionAction'

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
  questionAction.getQuestionInfo('596dc82469083ad500211cae').then(info => {
    res.json(info)
  })
});
module.exports = router;
