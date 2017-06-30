import express from 'express';
const Request  = require('request').defaults({'proxy': 'http://127.0.0.1:8087'});;
import Querystring from 'querystring';
import Guid from 'guid';

const router = express.Router();
const csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.0';
const app_id = '154086658467747';
const app_secret = '29dff4b859d858ef95c0fefca93db6f5';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token'; 


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    'username': "Bowen"
  })
});

router.post('/login_success', (req, res, next) => {

  // CSRF check
  if (req.body.state === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: req.body.code,
      access_token: app_access_token
    };
    
    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);

    Request.get({url: token_exchange_url,  rejectUnauthorized: false, json: true}, function(err, resp, respBody) {
      // console.log(err, resp, respBody)
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,	
      };

      // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url,  rejectUnauthorized: false,  json: true}, function(err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }

        // store & get user

        response.writeHead(200, {'Content-Type': 'text/html'});
          response.end("233333 :( ");
      });
    });
  } 
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
})

module.exports = router;
