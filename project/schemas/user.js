const mongoose = require('mongoose');

const { schema } = mongoose;
const userSchema = new schema; ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: { 
        type: Number,
        require : true,
    },
    married : {
        type : Boolean,
        require : true,
    },
    comment : {
        type: String
    },
    createAt: {
        type : Date,
        default: Date.now,
    }
});

module.exports = mongoose.module('User', userSchema);