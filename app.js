const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// user packages
const sequelize = require('./util/database');

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

User.hasMany(Book);
Book.belongsTo(User);


sequelize
.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => console.log('Error Running Server > Sequelize Sync Failed'));