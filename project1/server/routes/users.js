const express = require('express');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// 회원 목록 조회 라우터
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 로그인 라우터
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('로그인에 실패했습니다.');
    }
});

// 회원가입 라우터
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '회원가입 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
