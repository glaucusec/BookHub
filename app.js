const express = require('express');
const bodyParser = require('body-parser');

// user packages
const sequelize = require('./util/database');

// routes
const routes = require('./routes/routes');

// models
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.use('/', express.static(__dirname + '/public'));


sequelize
.sync()
.then(result => {
    app.listen(3000);
})
.catch(err => console.log('Error Running Server > Sequelize Sync Failed'));