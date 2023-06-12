const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    timestamps: false
})

module.exports = Book;