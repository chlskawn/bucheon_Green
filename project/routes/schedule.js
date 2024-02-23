const express = require('express');
const router = express.Router

router.post('/', async (req, res) => {
    try {
        const eventDate = req.body;
        res.status(201).json({message: '이벤트가 추가되었습니다.'});
    } catch (err) {
        console.error(err);
            res.status(500).json({message: '이벤트 추가 중 오류가 발생했습니다.'});
    }
});

router.get('/', async (req, res) => {
    try{
        const events = [];
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: '이벤트 목록 조회 중 오류가 발생했습니다.'});
    }
})

module.exports = router;