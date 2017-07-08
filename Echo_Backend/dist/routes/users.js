'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _guid = require('guid');

var _guid2 = _interopRequireDefault(_guid);

var _userAction = require('../services/userAction');

var _userAction2 = _interopRequireDefault(_userAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Request = require('request').defaults({ proxy: 'http://127.0.0.1:8087' });

var router = _express2.default.Router();
var csrfGuid = _guid2.default.raw();
var accountKitApiVersion = 'v1.0';
var appId = '154086658467747';
var appSecret = '29dff4b859d858ef95c0fefca93db6f5';
var meEndpointBaseUrl = 'https://graph.accountkit.com/v1.1/me';
var tokenExchangeBaseUrl = 'https://graph.accountkit.com/v1.1/access_token';

/* GET users listing. */
router.get('/test', function (req, res) {
  var num = req.query.num;
  var id = req.query.id;
  // console.log(num)
  _userAction2.default.updateUsername(id, num).then(function (result) {
    res.send({ 'res': result });
  });
});

router.get('/getCsrf', function (req, res) {
  res.send({ csrf: csrfGuid });
});

router.post('/login_success', function (req, response) {
  // CSRF check
  if (req.body.state === csrfGuid) {
    var appAccessToken = ['AA', appId, appSecret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: req.body.code,
      access_token: appAccessToken
    };

    // exchange tokens
    var tokenExchangeUrl = tokenExchangeBaseUrl + '?' + _querystring2.default.stringify(params);

    Request.get({ url: tokenExchangeUrl, rejectUnauthorized: false, json: true }, function (err, resp, respBody) {
      // console.log(err, resp, respBody)
      if (err) {
        response.writeHead(400, { 'Content-Type': 'text/html' });
        return;
      }
      var view = {
        userAccessToken: respBody.access_token,
        expiresAt: respBody.expires_at,
        userId: respBody.id
      };

      // get account details at /me endpoint
      var meEndpointUrl = meEndpointBaseUrl + '?access_token=' + respBody.access_token;
      Request.get({ url: meEndpointUrl, rejectUnauthorized: false, json: true }, function (err, resp, respBody) {
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
        _userAction2.default.createNewUser(view.phone_num, view.email_addr).then(function (isSucess) {
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
//# sourceMappingURL=users.js.map
