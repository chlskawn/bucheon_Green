const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./schemas/user');
const connect = require('./schemas');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const registersRouter = require('./routes/registers')
const bodyParser = require('body-parser');

const app = express();
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registers', registersRouter);
app.use('/chats', chatsRouter);
app.use('/moneys', moneysRouter);
app.use('/schedule', schedulesRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
