const mongoose = require('mongoose');

const { Schema } = mongoose;
const registerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;

