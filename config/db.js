// config/db.js
// connecting to mongo here so app.js isn't a mess

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // grabbing connection string from .env so we don't leak it on git
    const uri = process.env.MONGO_URI;

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected (pet-care-db)');
  } catch (err) {
    console.error('❌ mongo connection error:', err.message);
    process.exit(1); // if db is dead, no point running the app
  }
};

module.exports = connectDB;