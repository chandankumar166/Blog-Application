const express = require('express');
const {createComment, getComments, likeComment} = require('../controllers.js/comment');
const {verifyUser} = require('../utils/verifyUser');

const commentRouter = express.Router();

commentRouter.post('/create',verifyUser, createComment);
commentRouter.get('/comments/:postId', getComments)
commentRouter.put('/likeComment/:commentId', verifyUser, likeComment)

module.exports = {commentRouter}