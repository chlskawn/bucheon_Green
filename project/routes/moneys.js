const express = require('expres');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('모든 회비 정산 기록을 가져옵니다.')
})

router.post('/', (req, res) => {
    res.send('새로운 회비 정산 기록을 생성합니다.')
})

router.delete('/', (req, res) => {
    res.send(`회비 정산 기록 ID가 ${recordId}인 회비 정산 기록을 삭제합니다.`)
});

module.express = router;