const express = require('express');
// const User = require('../schemas/user');
const User = require('../schemas/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
})

router.post('/', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = new User({username, email, password});
        await user.save();
        res.status(201).json({message: '회원가입이 성공적으로 완료되었습니다.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: '회원가입 중 오류가 발생했습니다.'});
    }
});

module.exports = router;
