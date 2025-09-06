const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://bismaarshad8090_db_user:A3KYVYucQtkU3IFb@cluster0.kihhkzt.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";

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
  }
};

module.exports = mongoDB;
