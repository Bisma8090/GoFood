const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

// DB Connect
mongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
});
