import express from 'express';
import request from 'request';
import config from '../config'

let searchConfig = config.search;

const router = express.Router();

router.get('/question', (req, res) => {
  console.log(req.query);
  var keyword = req.query.keywords;
  // form search query
  var searchQuery = {
    "query":{
        "AND":{
          "*": [keyword]
        }
    }
  }
  // send request to search engine
  var options = {
    url: searchConfig.searchEndpoint,
    qs:searchQuery
  }
  request(options).on('response', response => {
    console.log(response);
    var contentType = response.headers['content-type'];
    res.status(response.statusCode);
    contentType && res.type(contentType);
  }).pipe(res);
});

module.exports = router;