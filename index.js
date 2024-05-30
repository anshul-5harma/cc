const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const fileUpload = require('express-fileupload')
const BlogPost = require('./models/BlogPostSchema')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://applicationanshul:XNtkAomh61LfasvO@thecodecomit.ldaxcs9.mongodb.net/sample')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload())

app.get("/", (req, res) => {
    res.render('form')
})

app.post('/posts/store', async (req, res) => {
    console.log(req)
    try {
        let image = req.files.image
        image.mv(path.resolve(__dirname, 'public/img', image.name))
        const blogpost = await BlogPost.create({
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