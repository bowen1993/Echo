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
  questionAction.createQuestion('this is a test question?' ,'59648f22178469048674fc57').then( result =>{
    res.json({
      isSuccess: result
    })
  })
});
module.exports = router;
