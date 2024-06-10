const User = require('../models/UserSchema');
module.exports = async (req, res) => {
    console.log(req)
    try {
        const user = await User.create({username: req.body.username, password: req.body.password});
        console.log(user);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the user');
    }
};