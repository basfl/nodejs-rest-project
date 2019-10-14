const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
const uuidv4 = require('uuid/v4');
const connection_string = require('./util/decrept');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const app = express();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        console.log("*************")
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//app.use(bodyParser.urlencoded()); //for form
app.use(bodyParser.json()); //for application/json
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use("/images", express.static(path.join(__dirname, "images")));
// handle CORS issue
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
    console.log("inside error middleware err-> ", err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message: message, data: data })
})
mongoose.connect(connection_string).then(result => {
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
        console.log('Client connected');
    });
}).catch(err => {
    console.log(err)
})


