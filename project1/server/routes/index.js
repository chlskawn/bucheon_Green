const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // 요청의 바디에서 사용자 데이터 추출
    const { username, email } = req.body;
    
    // 새로운 사용자 생성
    const newUser = new User({ username, email });

    // 새로운 사용자 저장
    const savedUser = await newUser.save();

    // 저장된 사용자를 응답으로 보냄
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    // 모든 사용자 검색
    const users = await User.find({});
    
    // 사용자 목록을 로그인 페이지에 렌더링
    res.render('login', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
