const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const connect = require('./schemas');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ExercisesRouter = require('./routes/Exercises');

const app = express();
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});
connect(); // 데이터베이스 연결 설정

require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Exercises', ExercisesRouter);

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// // 에러 핸들링 미들웨어
// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
