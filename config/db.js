const mongoose = require('mongoose');

const connectDB = async () => {
<<<<<<< HEAD
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(1);
    }
};

module.exports = connectDB;
=======
  const MONGO_URI = process.env.MONGO_URL || process.env.MONGODB_URI;

  if (!MONGO_URI) {
    console.error('Error: Neither MONGO_URL nor MONGODB_URI is defined in your environment (.env file).');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

>>>>>>> f746283f901bfc7bee37a1353f8027d29e1105e8
