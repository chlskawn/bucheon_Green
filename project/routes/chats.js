const express = require('express');
const router = express.Router();

router.get('/chats', (req, res) => {
    res.send('채팅 목록을 가져옵니다.');
});

router.post('/chats', (req, res) => {
    res.send('새로운 채팅을 생성합니다.')
});

module.express = router;