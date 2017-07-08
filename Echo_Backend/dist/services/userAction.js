'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _moniker = require('moniker');

var _moniker2 = _interopRequireDefault(_moniker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

async function isPhoneExists(phoneNum, userDao) {
    var user = await userDao.findOne({
        phoneNum: phoneNum
    });
    var isUserExists = user != null;

    return new _promise2.default(function (resolve) {
        resolve(isUserExists);
    });
}

async function isUserExists(userId, userDao) {
    console.log('finding');
    var user = await userDao.findOne({
        id: userId
    });
    console.log('found finish');
    var isUserExists = user != null;

    return new _promise2.default(function (resolve) {
        resolve(isUserExists);
    });
}

async function updateUsername(userId, newUsername) {
    //get db session
    var session = await _models2.default.getSession();
    var userDao = session.getDao(User);

    console.log('start');
    var isSuccessful = await isUserExists(userId, userDao);
    console.log(isSuccessful);

    if (isSuccessful) {
        var updatedInfo = {
            username: newUsername
        };
        await updateUserInfo(userId, updatedInfo, userDao);
    }

    return new _promise2.default(function (resolve) {
        resolve(isSuccessful);
    });
}

async function createNewUser(phoneNum, email) {
    var username = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    //get db session
    var session = await _models2.default.getSession();
    var userDao = session.getDao(User);

    var isUserExists = await isPhoneExists(phoneNum, userDao);

    if (!isUserExists) {
        if (username == null) {
            // generate random username
            username = _moniker2.default.choose();
        }

        //create new user
        var newUser = new User({
            username: username,
            phoneNum: phoneNum,
            email: email
        });

        //save new user
        await userDao.create(newUser);
    }

    return new _promise2.default(function (resolve) {
        resolve(!isUserExists);
    });
}

async function updateUserInfo(userId, updatedInfo, userDao) {
    await userDao.update({
        id: userId
    }, {
        $set: updatedInfo
    });
}

module.exports = {
    createNewUser: createNewUser,
    updateUsername: updateUsername
};
//# sourceMappingURL=userAction.js.map
