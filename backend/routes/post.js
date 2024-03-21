const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {createPost, getPosts, deletePost, updatePost} = require('../controllers.js/post');

const postRouter = express.Router();

postRouter.post('/create', verifyUser, createPost)
postRouter.get('/posts', getPosts)
postRouter.delete('/delete/:postId/:userId', verifyUser, deletePost)
postRouter.put('/update/:postId/:userId',verifyUser, updatePost)

module.exports = {postRouter}