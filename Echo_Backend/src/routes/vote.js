import express from 'express';
import * as voteAction from '../services/answerAction';

const router = express.Router();


router.put('/:answerId', (req, res) => {
  const answerId = req.params.answerId;
  const { up, down } = req.body;
  voteAction.vote(answerId, up, down);
});

module.exports = router;