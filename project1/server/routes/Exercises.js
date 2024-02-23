const express = require('express');
const Exercise = require('../schemas/Exercise'); // Exercise 스키마를 가져옴
const commentController = require('../controllers/commentController');
const {Post} = require('../schemas/Exercise');
const {Event} = require('../schemas/Exercise');

const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Exercise 조회 중 오류가 발생했습니다.' });
    }
});

router.post('/exercises', async (req, res) => {
    try {
        const exerciseData = req.body;
        const exercise = new Exercise(exerciseData);
        await exercise.save();
        res.status(201).json({ message: 'Exercise가 추가되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Exercise 추가 중 오류가 발생했습니다.' });
    }
});

router.delete('/exercises/:id', async (req, res) => {
    try {
        const exerciseId = req.params.id;
        await Exercise.findByIdAndDelete(exerciseId);
        res.json({ message: 'Exercise가 삭제되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Exercise 삭제 중 오류가 발생했습니다.' });
    }
});


// 채팅 기능 라우터
router.get('/chats', (req, res, next) => {
    res.send('채팅 목록을 가져옵니다.');
});

router.post('/chats', (req, res) => {
    res.send('새로운 채팅을 생성합니다.');

});

// 회비 납부내역 라우터
router.get('/payments', (req, res) => {
    res.send('모든 회비 정산 기록을 가져옵니다.');
});

router.post('/payments', (req, res) => {
    res.send('새로운 회비 정산 기록을 생성합니다.');
});

router.delete('/payments/:recordId', (req, res) => {
    const recordId = req.params.recordId;
    res.send(`회비 정산 기록 ID가 ${recordId}인 회비 정산 기록을 삭제합니다.`);
});

// 캘린더 관련 라우터
router.post('/events', async (req, res) => {
    try {
        const eventData = req.body;
        // 이벤트 생성 로직 추가
        const newevent= new Event(eventData);
        await newevent.save();
        res.status(201).json({ message: '이벤트가 추가되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '이벤트 추가 중 오류가 발생했습니다.' });
    }
});

// 게시글 관련 라우터
router.get('/posts', async (req, res) => {
    try {
        const posts = [];
        // 게시글 조회 로직 추가
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '게시글 조회 중 오류가 발생했습니다.' });
    }
});

router.post('/posts', async (req, res) => {
    try {
        const postData = req.body;
        // 게시글 생성 로직 추가
        const newPostData = new Post(postData);
        await newPostData.save();
        res.status(201).json({ message: '게시글이 생성되었습니다.', post: newPostData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '게시글 생성 중 오류가 발생했습니다.' });
    }
});

// routes/commentRouter.js
router.post('/Exercises', commentController.createComment);
router.get('/Exercises/:postId', commentController.getCommentsByPostId);


module.exports = router;
