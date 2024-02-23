const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const postData = req.body;
        res.status(201).json({message: '게시글이 생성되었습니다.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: '게시글 생성 중 오류가 발생했습니다.'})
    }
});

router.get('/', async (req, res) => {
    try{
        const posts = [];
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: '게시글 조회 중 오류가 발생했습니다.'});
    }
});

module.express = router;