const express = require("express");
const { body } = require("express-validator/check");
const feedController = require('../controllers/feed');
const is_auth = require("../middleware/is-auth");
const router = express.Router();

router.get("/posts", is_auth, feedController.getPosts);

router.post("/post", is_auth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], feedController.createPost);

router.get("/post/:postId", is_auth, feedController.getPost)

router.put("/post/:postId", is_auth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], feedController.updatePost);

router.delete("/post/:postId", is_auth, feedController.deletePost)

module.exports = router