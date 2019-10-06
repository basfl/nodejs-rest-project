const { validationResult } = require('express-validator/check');
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
        return res.status(422).json({ message: "validation failed!!", errors: errors.array() })
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log("title", req.body)
    res.status(201).json({
        message: "post created succesfully!!",
        post: { _id: new Date().toISOString(), title: title, content: content, creator: { name: "bob" }, createdAt: new Date().toISOString() }
    })
}