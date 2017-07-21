import express from 'express';
import * as tagAction from '../services/tagAction';

const router = express.Router();

router.get('/tags', (req, res) => {
  tagAction.getAllTags().then((tags) => {
    return res.send(tags);
  });
});
