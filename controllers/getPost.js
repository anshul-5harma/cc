const path = require('path')
const BlogPost = require("../models/BlogPostSchema");
module.exports = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id)
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the user');
    }
};
