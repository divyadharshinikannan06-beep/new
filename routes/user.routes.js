<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/permission.middleware');

const {
    getStudents,
    getTeachers,
    getStudentById,
    getTeacherById,
    updateProfile,
    updateStudent
} = require('../controllers/user.controller');

router.use(authMiddleware);

// Student and Teacher APIs
router.get('/students', checkRole('Student', 'Teacher'), getStudents);
router.get('/students/:id', checkRole('Student', 'Teacher'), getStudentById);
router.patch('/profile', checkRole('Student', 'Teacher'), updateProfile);

// Teacher-only APIs
router.get('/teachers', checkRole('Teacher'), getTeachers);
router.get('/teachers/:id', checkRole('Teacher'), getTeacherById);
router.patch('/students/:id', checkRole('Teacher'), updateStudent);

module.exports = router;
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
