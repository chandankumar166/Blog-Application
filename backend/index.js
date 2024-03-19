const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {userRouter} = require('./routes/user');
const {authRouter} = require('./routes/auth');

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB was connected successfully'))
    .catch((error) => console.log(error));

app.use(express.json());
app.use('/api/user', authRouter);

app.listen(3001, () => console.log('Server is listening'));