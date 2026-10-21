<<<<<<< HEAD
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
=======
const userService = require("../services/user.service");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res
          .status(400)
          .json({ message: 'Both "name" and "email" are required' });
      }

      const newUser = await userService.createUser({ name, email });
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "A user with this email already exists" });
      }
      res.status(400).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res
          .status(400)
          .json({
            message:
              'Both "name" and "email" are required for full update (PUT)',
          });
      }

      const updatedUser = await userService.updateUser(req.params.id, {
        name,
        email,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "A user with this email already exists" });
      }
      res.status(400).json({ error: err.message });
    }
  }

  async patchUser(req, res) {
    try {
      const updates = {};
      if (req.body.name !== undefined) updates.name = req.body.name;
      if (req.body.email !== undefined) updates.email = req.body.email;

      if (Object.keys(updates).length === 0) {
        return res
          .status(400)
          .json({ message: 'Provide at least "name" or "email" to update' });
      }

      const updatedUser = await userService.patchUser(req.params.id, updates);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "A user with this email already exists" });
      }
      res.status(400).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async softDeleteUser(req, res) {
    try {
      const updatedUser = await userService.softDelete(req.params.id);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        message: "User soft deleted successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async userSignup(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = await userService.userSignup({ name, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "A user with this email already exists" });
      }
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Both "email" and "password" are required' });
      }

      const loginData = await userService.loginUser(email, password);
      res.json(loginData);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async addUserProfile(req, res) {
    try {
      const { userId, age, dob, bio } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const newUserProfile = await userService.addUserProfile(userId, { age, dob, bio });
      res.status(201).json(newUserProfile);
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(409)
          .json({ message: "A profile for this user already exists" });
      }
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
