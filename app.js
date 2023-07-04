const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const corsOptions = require('./config/corsOptions');
const { orderController } = require('./controllers/orderController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
env.config(corsOptions);

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const port = process.env.PORT || 2727;
connectDB().then(() => {
  app.listen(port, () => {
    console.log('listening for requests');
  });
});

app.post('/api/v1/order', orderController);

app.all('*', (req, res) => {
  res.status(400).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
