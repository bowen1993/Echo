import express from 'express';
import * as answerAction from '../services/answerAction';

const router = express.Router();

router.post('/', (req, res) => {
  const author = req.session.user;
  const { questionId, answer } = req.body;

  answerAction.addAnswer2Question(answer, questionId, author.id).then((isSuccess) => {
    return res.send(isSuccess);
  });
});

router.put('/vote/:answerId', (req, res) => {
  const answerId = req.params.answerId;
  answer;
});

module.exports = router;