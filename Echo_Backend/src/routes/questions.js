import express from 'express';
import * as questionAction from '../services/questionAction';

const router = express.Router();

router.get('/', (req, res) => {
  questionAction.getQuestions(req.query).then((questions) => {
    return res.send(questions);
  });
});

router.get('/:id', (req, res) => {
  questionAction.getQuestionInfo(req.params.id).then(question => res.send(question));
});

router.get('/suggest', (req, res) => {
  questionAction.suggest('userid').then((questions) => {
    return res.send(questions);
  });
});

router.post('/create', (req, res) => {
  const author = req.session.user;
  const question = req.body.question;
  questionAction.createQuestion(question.title, author.id, question.content).then((newQuestion) => {
    return res.send(newQuestion);
  });
});

module.exports = router;