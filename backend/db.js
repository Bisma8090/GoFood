require('dotenv').config();

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI; // set in Railway Environment Variables

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB Atlas");

    const foodCollection = await mongoose.connection.db.collection("food_items");
    const data = await foodCollection.find({}).toArray();

    const categoryCollection = await mongoose.connection.db.collection("Categories");
    const Catdata = await categoryCollection.find({}).toArray();

    global.foodData = data;
    global.foodCategory = Catdata;

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // exit if DB fails
  }
};

module.exports = mongoDB;
