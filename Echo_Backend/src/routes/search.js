import express from 'express';
import request from 'request';
import config from '../config'

const searchConfig = config.search;

const router = express.Router();

router.get('/question', (req, res) => {

  var keyword = req.query.keywords;

  // form search query
  var searchQuery = {
    "query":{
        "AND":{
          "*": [keyword]
        }
    }
  }

  let objQueryStr = JSON.stringify(searchQuery);

  // send request to search engine
  var options = {
    url: searchConfig.searchEndpoint,
    qs:{q:objQueryStr},
    method:'GET'
  }
  request(options).on('response', response => {
  }).pipe(res);
  
});

module.exports = router;