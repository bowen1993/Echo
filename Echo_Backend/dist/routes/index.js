'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({
    title: "Echo"
  });
});

router.get('/await', async function (req, res, next) {
  await console.log('dsaf');
  await res.send({ title: 'await' });
});

module.exports = router;
//# sourceMappingURL=index.js.map
