const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const ejs = require('ejs');
const path = require('path');
require('dotenv/config');

//middleware to use body parser in console
app.use(bodyParser.urlencoded({
    extended: true
}));
//middleware to call css file in the assets folder
app.use(express.static(__dirname, +'/assets'));
//middleware to 
app.set('view engine', 'ejs');

//1. Establish Port to be able to run it(This should be on the bottom of the script)
app.listen(3000, function () {
    console.log("Server is running on port 3000!");
});

//2.create the home page as a respond to the get request
app.get('/', async (req, res) => {
    try {
        User.find({}, function (err, userlist) {
            res.render('index', {
                userData: userlist
            })
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
});

app.get('/addUser', async (req, res) => {
    try {
        res.sendFile(__dirname + '/views/user.html')
        // const users = await User.find();
        // console.log(users)
    } catch (error) {
        res.json({
            message: "error"
        });
    }
});

//3.Connect to MongoDB
mongoose.connect(
    process.env.DATABASE_CONNECT,
    () => {
        console.log("Succesfuly Connected to DB");
    }
);

//import routes from the routes folder
const userRoute = require('./routes/user');
app.use('/user', userRoute);