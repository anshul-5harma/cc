const path = require('path')
const BlogPost = require("../models/BlogPostSchema");
module.exports = async (req, res) => {
    try {
        const blogs = await BlogPost.find({});
        res.status(201).json({
            success: true,
            blogs
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred fetching the blogs');
    }
};
