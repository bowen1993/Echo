import express from 'express';
import * as questionAction from '../services/questionAction';

const router = express.Router();

router.get('/suggest', (req, res) => {
  questionAction.suggest().then((questions) => {
    return res.send(questions);
  });
});

router.post('/create', (req, res) => {
  const author = req.session.user;
  const question = req.body.question;
  questionAction.create(question, author).then((newQuestion) => {
    console.log('hello', newQuestion);
    return res.send(newQuestion);
  });
});

module.exports = router;