const { validationResult } = require('express-validator/check');
const Post = require('../models/post');;
exports.getPosts = (req, res, next) => {
    console.log("##############");
    Post.find().then(posts => {
        res.status(200).json({
            message: "posts fetched!!",
            posts: posts
        })

    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
            console.log(err)
        })
    // res.status(200).json({
    //     posts: [
    //         {
    //             _id: "1",
    //             title: "first post",
    //             content: "this is the first post",
    //             imageUrl: "../images/test.jpg",
    //             creator: {
    //                 name: "bob"
    //             },
    //             createdAt: new Date()
    //         }
    //     ]
    // })
}
exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("validation failed!!");
        error.statusCode = 422;
        throw error;
        //  return res.status(422).json({ message: "validation failed!!", errors: errors.array() })
    }
    if(!req.file){
        const error = new Error("No image found!!");
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path.replace("\\" ,"/");
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: { name: 'bob' }
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "post created succesfully!!",
            post: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        console.log(err)
    })

}

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post fetched.', post: post });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }