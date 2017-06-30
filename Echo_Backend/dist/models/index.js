'use strict';

var _uniqueModel = require('unique-model');

var _uniqueModel2 = _interopRequireDefault(_uniqueModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoSession = _uniqueModel2.default.backend.mongo.Session;
var model = _uniqueModel2.default.model;
var types = _uniqueModel2.default.type;

var UInteger = types.UInteger;
var UDouble = types.UDouble;
var UBoolean = types.UBoolean;
var UString = types.UString;
var UObject = types.UObject;
var UObjectArray = types.UObjectArray;
var UDateTime = types.UDateTime;
var UMixed = types.UMixed;

//database config
var databaseConfig = {
    backend: MongoSession,
    uri: 'mongodb://localhost/echo'
};

async function getSession() {
    var session = await _uniqueModel2.default.createSession(databaseConfig);
    return session;
}
//define models
var User = model.createModel('User', {
    username: UString(),
    phoneNum: UString(),
    email: UString(),
    createDate: UDateTime(),
    modifyData: UDateTime(),
    description: UString()
});

module.exports = {
    User: User,
    getSession: getSession
};
//# sourceMappingURL=index.js.map
