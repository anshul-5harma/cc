const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
require('dotenv').config()
const fileUpload = require('express-fileupload')
const BlogPost = require('./models/BlogPostSchema')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(() => "Connected to MongoDB");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload({ createParentPath: true }))

app.get("/", (req, res) => {
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image
        await image.mv(path.resolve(__dirname, 'public/img', image.name))
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});