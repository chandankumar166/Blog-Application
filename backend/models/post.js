const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'uncategorized'
    }
},{timestamps: true})

const Post = new mongoose.model('post', postSchema);

module.exports = {Post}