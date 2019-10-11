const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/user");
const authController = require("../controllers/auth")
const router = express.Router();
router.put("signup", [
    body("email")
        .isEmail()
        .withMessage("Please enter valid email")
        .custom((value, { req }) => {
            return User.find(value)
                .then(userDoc => {
                    if (userDo) {
                        Promise.reject("E-mail already exist!!");
                    }

                })
        }).normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),

], authController.signup);
module.exports = router
