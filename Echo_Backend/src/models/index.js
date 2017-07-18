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
    name:UString(),
    tags: UObjectArray({
        type:'Tag'
    })
})

const Rate = model.createModel('Rate', {
  score: UDouble(),
  base: UDouble(),
  createTime: UDateTime(),
});

const User = model.createModel('User', {
<<<<<<< HEAD
    username: UString(),
    phoneNum: UString(),
    email: UString(),
    createDate: UDateTime(),
    modifyDate: UDateTime(),
    description: UString(),
    tags: UObjectArray({
        type:'Tag'
    }),
    rate: UObject({
        type:'Rate'
    })
});

const Comment = model.createModel('Comment', {
    content: UString(),
    author: UObject({
        type: 'User'
    }),
    createTime:UDateTime(),
    comments: UObjectArray({
        type:'Comment'
    })
})

const Answer = model.createModel('Answer', {
    content: UString(),
    author: UObject({
        type: User
    }),
    createTime: UDateTime(),
    lastModifyTime: UDateTime(),
    rate: UObject({
        type: 'Rate'
    }),
    comments: UObjectArray({
        type: Comment
    })
});

const Question = model.createModel('Question', {
    content: UString(),
    detail: UString(),
    author: UObject({
        type: 'User'
    }),
    createTime: UDateTime(),
    rate: UObject({
        type: 'Rate'
    }),
    answers: UObjectArray({
        type: 'Answer'
    }),
    tags:UObjectArray({
        type:'Tag'
    })
=======
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

const Category = model.createModel('Category', {
  name: UString(),
  tags: UObjectArray({
    type: Tag,
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
  rate: UObject({
    type: 'Rate',
  }),
});

const Question = model.createModel('Question', {
  content: UString(),
  author: UObject({
    type: 'User',
  }),
  createTime: UDateTime(),
  rate: UObject({
    type: 'Rate',
  }),
>>>>>>> e8fdb22b26b038f1d8c7722b5690d48197b90c83
});


module.exports = {
<<<<<<< HEAD
    User,
    Tag,
    Rate,
    Category,
    Comment,
    Question,
    Answer,
    getSession
}
=======
  User,
  getSession,
  Question,
};
>>>>>>> e8fdb22b26b038f1d8c7722b5690d48197b90c83
