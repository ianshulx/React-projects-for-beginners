const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongoStr");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
