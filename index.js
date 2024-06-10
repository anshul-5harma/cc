const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const bodyParser = require("body-parser")
require('dotenv').config()
const fileUpload = require('express-fileupload')

const mongoose = require('mongoose');
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const storeUserController = require('./controllers/storeUser')

mongoose.connect(process.env.DB).then(() => "Connected to MongoDB");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(fileUpload({ createParentPath: true }))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',homeController)
app.get('/posts/new', newPostController)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.post('/user/new', storeUserController)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});