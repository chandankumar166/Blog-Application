const express = require('express');
const {createComment, getComments, likeComment, editComment, deleteComment} = require('../controllers.js/comment');
const {verifyUser} = require('../utils/verifyUser');

const commentRouter = express.Router();

commentRouter.post('/create',verifyUser, createComment);
commentRouter.get('/comments/:postId', getComments)
commentRouter.put('/likeComment/:commentId', verifyUser, likeComment)
commentRouter.put('/edit/:commentId',verifyUser, editComment)
commentRouter.delete('/delete/:commentId', verifyUser, deleteComment)

module.exports = {commentRouter}