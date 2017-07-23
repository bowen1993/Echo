import um from 'unique-model';

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

// database config
const databaseConfig = {
  backend: MongoSession,
  uri: 'mongodb://localhost/echo',
};

async function getSession() {
  const session = await um.createSession(databaseConfig);
  return session;
}
// define models
const Tag = model.createModel('Tag', {
  name: UString(),
});

const Category = model.createModel('Category', {
  name: UString(),
  tags: UObjectArray({
    type: 'Tag',
  }),
});

const Rate = model.createModel('Rate', {
  score: UDouble(),
  createTime: UDateTime(),
});

const User = model.createModel('User', {
  username: UString(),
  phoneNum: UString(),
  email: UString(),
  avatar: UString(),
  createDate: UDateTime(),
  modifyDate: UDateTime(),
  description: UString(),
  tags: UObjectArray({
    type: 'Tag',
  }),
  rate: UObject({
    type: 'Rate',
  }),
});

const Comment = model.createModel('Comment', {
  content: UString(),
  author: UObject({
    type: 'User',
  }),
  createTime: UDateTime(),

});

const Answer = model.createModel('Answer', {
  content: UString(),
  author: UObject({
    type: 'User',
  }),
  createTime: UDateTime(),
  lastModifyTime: UDateTime(),
  up: UInteger(),
  down: UInteger(),
  rate: UObject({
    type: 'Rate',
  }),
});

const Question = model.createModel('Question', {
  title: UString(),
  content: UString(),
  author: UObject({
    type: 'User',
  }),
  createTime: UDateTime(),
  lastModifyTime: UDateTime(),
  answers: UObjectArray({
    type: 'Answer',
  }),
  tags: UObjectArray({
    type: 'Tag',
  }),
  rate: UObject({
    type: 'Rate',
  }),
});


module.exports = {
  User,
  Tag,
  Rate,
  Category,
  Comment,
  Question,
  Answer,
  getSession,
};
