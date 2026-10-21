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