const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/index');
const { PORT = 3000 } = process.env;


const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})