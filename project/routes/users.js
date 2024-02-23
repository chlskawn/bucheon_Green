const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  router.post('/', async (req, res) => {
    const { email, password} = req.body;
    try {
      const user = await User.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({message: '이메일 또는 비밀번호가 올바르지 않습니다.'});
    }
    const token = jwt.sign({userId: user._id}, 'secret_key', {expiresIn: '1h'});
    res.status(200).json({token});
    } catch (err) {
      console.error(err);
      res.status(500).send('로그인에 실패했습니다.');
    }
  });



module.exports = router;