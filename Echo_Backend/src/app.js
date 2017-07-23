import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import um from 'unique-model';
import routes from './routes/index';
import users from './routes/users';
import questions from './routes/questions';
import answers from './routes/answers';
import votes from './routes/vote';

const RedisStore = require('connect-redis')(session);

const app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const options = {
  host: '127.0.0.1',
  port: '6379',
  ttl: 60 * 60 * 24 * 30,   // session的有效期为30天(秒)
};
app.use(cookieParser('xiaocc__'));
app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
  }),
  resave: false,
  saveUninitialized: false,
  secret: 'keyboard cat',
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    next();
  }
});
const MongoSession = um.backend.mongo.Session;
// database config
const databaseConfig = {
  backend: MongoSession,
  uri: 'mongodb://localhost/echo',
};

app.use((req, res, next) => {
  um.createSession(databaseConfig);
  req.session.db = um.createSession(databaseConfig);
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);
app.use('/answers', answers);
app.use('/vote', votes);
// app.use((req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
