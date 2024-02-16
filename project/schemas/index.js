const mongoose = require('mongoose');

const connect= () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://root:1234@localhost:27017/admin',{
        dbName: 'nodejs',
        useNewUrlParser: true,
    }).then(() => {
        console.log('몽고디비 연결 성공');
    }).catch((err) => {
        console.log('몽고디비 연결 에러', err);
    });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결일 끊어짐 연결 재시도함');
    connect();
});

module.exports = connect;