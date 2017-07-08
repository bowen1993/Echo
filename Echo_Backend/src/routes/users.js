import express from 'express';
import Querystring from 'querystring';
import Guid from 'guid';
import userAction from '../services/userAction';

const Request = require('request').defaults({ proxy: 'http://127.0.0.1:8087' });

const router = express.Router();
const csrfGuid = Guid.raw();
const accountKitApiVersion = 'v1.0';
const appId = '154086658467747';
const appSecret = '29dff4b859d858ef95c0fefca93db6f5';
const meEndpointBaseUrl = 'https://graph.accountkit.com/v1.1/me';
const tokenExchangeBaseUrl = 'https://graph.accountkit.com/v1.1/access_token';


/* GET users listing. */
router.get('/test', (req, res) => {
  const num = req.query.num;
  var id = req.query.id;
  // console.log(num)
  userAction.updateUsername(id, num).then((result) => {
    res.send({'res':result});
  })
});

router.get('/getCsrf', (req, res) => {
  res.send({ csrf: csrfGuid });
});

router.post('/login_success', (req, response) => {
  // CSRF check
  if (req.body.state === csrfGuid) {
    const appAccessToken = ['AA', appId, appSecret].join('|');
    const params = {
      grant_type: 'authorization_code',
      code: req.body.code,
      access_token: appAccessToken,
    };

    // exchange tokens
    const tokenExchangeUrl = `${tokenExchangeBaseUrl}?${Querystring.stringify(params)}`;

    Request.get({ url: tokenExchangeUrl, rejectUnauthorized: false, json: true }, (err, resp, respBody) => {
      // console.log(err, resp, respBody)
      if (err) {
        response.writeHead(400, { 'Content-Type': 'text/html' });
        return;
      }
      const view = {
        userAccessToken: respBody.access_token,
        expiresAt: respBody.expires_at,
        userId: respBody.id,
      };

      // get account details at /me endpoint
      const meEndpointUrl = `${meEndpointBaseUrl}?access_token=${respBody.access_token}`;
      Request.get({ url: meEndpointUrl, rejectUnauthorized: false, json: true }, (err, resp, respBody) => {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }

        if (!view.phone_num) {
          response.writeHead(400, { 'Content-Type': 'text/html' });
          return;
        }
        // store & get user
        userAction.createNewUser(view.phone_num, view.email_addr).then((isSucess) => {
          // if new user created, isSuccess would be true, else false (user exists)

        });

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('233333 :( ');
      });
    });
  } else {
    // login failed
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.end('Something went wrong. :( ');
  }
});


module.exports = router;
