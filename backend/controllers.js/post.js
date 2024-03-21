const {Post} = require("../models/post");
const {postSchema} = require("../types");
const {errorHandler} = require("../utils/error");

const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not the admin'))
    }
    
    const {success} = postSchema.safeParse(req.body);
    if (!success) {
        return next(errorHandler(400, 'All fields are required'))
    }
    const newPost = new Post({
        ...req.body,
        userId: req.user.userId
    })
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    }
    catch(error) {
        return next(error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {
                        title: {
                            $regex: req.query.searchTerm,
                            $option: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: req.query.searchTerm,
                            $options: 'i'
                        }
                    }
                ]
            })
        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const monthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1, 
            now.getDate()
        )
        const lastMonthPosts = await Post.countDocuments({
            createdAt: {$gte: monthAgo}
        })
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    }
    catch(error) {
        next(error)
    }
}
module.exports = {createPost, getPosts}