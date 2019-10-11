const User = require("../models/user");
const { validationResult } = require('express-validator/check');
var bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("validation failed!!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;

    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    bcrypt.hash(password, 12)
        .then(hashPw => {
            user = new User({
                email: email,
                name: name,
                password: hashPw,

            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: "User Created",
                userId: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}