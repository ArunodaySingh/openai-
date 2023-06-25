const mongoose = require("mongoose");

const connectDB = async () => {
  // MongoDB connection URL
  const url = "mongodb://localhost:27017/openai";

  // Connect to MongoDB
  await mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    });
};

module.exports = connectDB;
