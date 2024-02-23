const mongoose = require('mongoose');

// 채팅 스키마 정의
const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// 회비 납부내역 스키마 정의
const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    member: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

// 이벤트 스키마 정의
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: String
});

//게시글 스키마 정의
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




// 모델 생성
const Chat = mongoose.model('Chat', chatSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Event = mongoose.model('Event', eventSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Chat, Payment, Event, Post, Comment };
