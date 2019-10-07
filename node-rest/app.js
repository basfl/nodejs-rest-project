const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path=require("path");
const connection_string = require('./util/decrept');
const feedRoutes = require('./routes/feed');
const app = express();

//app.use(bodyParser.urlencoded()); //for form
app.use(bodyParser.json()); //for application/json
app.use("/images",express.static(path.join(__dirname,"images")));
// handle CORS issue
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);

app.use((err,req,res,next)=>{
    console.log("inside error middleware err-> ",err);
    const status=err.statusCode || 500;
    const message=err.message;
    res.status(status).json({message:message})
})
mongoose.connect(connection_string).then(result => {
    app.listen(8080);
}).catch(err => {
    console.log(err)
}) 


