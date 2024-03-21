const express = require('express');
const {createComment} = require('../controllers.js/comment');
const {verifyUser} = require('../utils/verifyUser');

const commentRouter = express.Router();

commentRouter.post('/create',verifyUser, createComment);

module.exports = {commentRouter}