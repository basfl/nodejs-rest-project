const { validationResult } = require('express-validator/check');
const Post = require('../models/post');;
exports.getPosts = (req, res, next) => {
    console.log("##############");
    res.status(200).json({
        posts: [
            {
                _id: "1",
                title: "first post",
                content: "this is the first post",
                imageUrl: "../images/test.jpg",
                creator: {
                    name: "bob"
                },
                createdAt: new Date()
            }
        ]
    })
}
exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error=new Error("validation failed!!");
        error.statusCode=422;
        throw error;
      //  return res.status(422).json({ message: "validation failed!!", errors: errors.array() })
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/test.jpg',
        creator: { name: 'bob' }
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "post created succesfully!!",
            post: result
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
        console.log(err)
    })

}