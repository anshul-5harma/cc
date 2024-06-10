const BlogPost = require("../models/BlogPostSchema")
const path = require("path")
module.exports = async (req, res) => {
  try {
    let image = req.files.image;
    await image.mv(path.resolve(__dirname, "public/img", image.name));
    await BlogPost.create({
      ...req.body,
      image: "/img/" + image.name,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
