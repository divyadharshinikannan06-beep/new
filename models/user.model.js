const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
<<<<<<< HEAD
        unique: true,
        lowercase: true
=======
        unique: true
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher'],
<<<<<<< HEAD
        default: 'Student'
=======
        required: true,
        default: 'Student'
    },
    department: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);