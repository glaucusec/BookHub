const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config()

const mongoose = require('mongoose');

// routes
const routes = require('./routes/routes');

// models
const User = require('./models/user');
const Book = require('./models/book');

const app = express();

app.use(cookieParser());

app.use(
    session( {
        key: 'session_sid',
        secret: process.env.SESSION_SECRET_TOKEN,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
        saveUninitialized: false,
    })
);


app.use(bodyParser.json());

app.use('/', routes);

app.use('/', express.static(__dirname + '/public'));


async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bookhub')
        console.log('DB connected');
        app.listen(3000);
        console.log('Listening...')
    } catch(e) {
        console.log(e.message);
    }
}

main()