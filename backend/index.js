const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {userRouter} = require('./routes/user');
const {authRouter} = require('./routes/auth');
const cookieParser = require('cookie-parser');
const {postRouter} = require('./routes/post');
const {commentRouter} = require('./routes/comment');

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB was connected successfully'))
    .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3001, () => console.log('Server is listening'));