import express from 'express';
import * as voteAction from '../services/voteAction';

const router = express.Router();


router.put('/:answerId', (req, res) => {
  const answerId = req.params.answerId;
  const { up, down } = req.body;

  voteAction.vote(answerId, up, down);
  res.send();
});

module.exports = router;