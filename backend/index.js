const express = require('express');
const app = express();
const mongoDB = require('./db');
const cors = require('cors');

// Use dynamic port from Railway (or 5000 for local dev)
const port = process.env.PORT || 5000;

// ✅ Use CORS properly
app.use(cors({
  origin: ["http://localhost:3000", "https://go-food-drab.vercel.app"], // allow local + vercel frontend
  credentials: true
}));

app.use(express.json());

// Connect DB
mongoDB();

// Test route
app.get('/', (req, res) => {
  res.send('Hello World! Backend is running 🚀');
});

// Routes
app.use('/api/auth', require('./Routes/Auth'));

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
