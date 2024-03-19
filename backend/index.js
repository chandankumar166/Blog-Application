const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB was connected successfully'))
    .catch((error) => console.log(error));

app.listen(3001, () => console.log('Server is listening'));