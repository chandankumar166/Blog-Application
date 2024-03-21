const express = require('express');
const {verifyUser} = require('../utils/verifyUser');
const {createPost, getPosts} = require('../controllers.js/post');

const postRouter = express.Router();

postRouter.post('/create', verifyUser, createPost)
postRouter.get('/posts', getPosts)

module.exports = {postRouter}