import request from 'request';
import config from '../config'

const searchConfig = config.search;

function saveInfo2Norch(infoObject){
  var options = {
    method:'POST',
    body: infoObject,
    json: true,
    url:searchConfig.searchAdd
  }

  //send data to norch
  request(options).on('response', (response) => {
    console.log(response.body);
  });
}

module.exports = {
  saveInfo2Norch
}