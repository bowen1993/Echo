import um from 'unique-model'

const MongoSession = um.backend.mongo.Session;
const model = um.model;
const types = um.type;

const UInteger = types.UInteger;
const UDouble = types.UDouble;
const UBoolean = types.UBoolean;
const UString = types.UString;
const UObject = types.UObject;
const UObjectArray = types.UObjectArray;
const UDateTime = types.UDateTime;
const UMixed = types.UMixed;

//database config
const databaseConfig = {
    backend: MongoSession,
    uri: 'mongodb://localhost/echo'
}

async function getSession(){
    const session = await um.createSession(databaseConfig);
    return session;
}
//define models
const User = model.createModel('User', {
    username: UString(),
    phoneNum: UString(),
    email: UString(),
    createDate: UDateTime(),
    modifyData: UDateTime(),
    description: UString()
});

module.exports = {
    User,
    getSession
}