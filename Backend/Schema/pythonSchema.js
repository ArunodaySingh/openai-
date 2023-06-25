const mongoose = require("mongoose");

// Define a schema
const PySchema = new mongoose.Schema({
  title: String,
  count: Number,
  createdAt: { type: Date, default: Date.now },
});

// Define a model
module.exports = mongoose.model("PySchema", PySchema);
