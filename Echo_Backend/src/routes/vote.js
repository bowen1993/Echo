import express from 'express';
import * as voteAction from '../services/answerAction';

const router = express.Router();


router.put('/:answerId', (req, res) => {
  const answerId = req.params.answerId;
});

module.exports = router;