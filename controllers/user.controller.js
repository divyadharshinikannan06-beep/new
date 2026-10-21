const mongoose = require('mongoose');
const User = require('../models/user.model');

async function getStudents(req, res) {
    try {
        const students = await User.find({ role: 'Student' })
            .select('-password');

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Unable to get students" });
    }
}

async function getTeachers(req, res) {
    try {
        const teachers = await User.find({ role: 'Teacher' })
            .select('-password');

        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Unable to get teachers" });
    }
}

async function getStudentById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const student = await User.findOne({
            _id: req.params.id,
            role: 'Student'
        }).select('-password');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Unable to get student" });
    }
}

async function getTeacherById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid teacher ID" });
        }

        const teacher = await User.findOne({
            _id: req.params.id,
            role: 'Teacher'
        }).select('-password');

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: "Unable to get teacher" });
    }
}

async function updateProfile(req, res) {
    try {
        const { name, email } = req.body;
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ message: "Invalid name" });
            }
            updates.name = name.trim();
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || !email.trim()) {
                return res.status(400).json({ message: "Invalid email" });
            }
            updates.email = email.trim().toLowerCase();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Enter name or email to update"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Profile update failed" });
    }
}

async function updateStudent(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid student ID" });
        }

        const { name, email } = req.body;
        const updates = {};

        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ message: "Invalid name" });
            }
            updates.name = name.trim();
        }

        if (email !== undefined) {
            if (typeof email !== 'string' || !email.trim()) {
                return res.status(400).json({ message: "Invalid email" });
            }
            updates.email = email.trim().toLowerCase();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "Enter name or email to update"
            });
        }

        const student = await User.findOneAndUpdate(
            { _id: req.params.id, role: 'Student' },
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Student update failed" });
    }
}

module.exports = {
    getStudents,
    getTeachers,
    getStudentById,
    getTeacherById,
    updateProfile,
    updateStudent
};