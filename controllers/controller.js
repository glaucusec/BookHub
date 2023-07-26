const path = require('path');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const rootDir = require('../util/path')

const User = require('../models/user');
const Book = require('../models/book');

const viewController = {

    dashBoard: async (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'dashboard.html'));
    },

    addBookPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'add-book.html'));
    },

    addBook: async (req, res, next) => {

        const { name, price, desc, author } = req.body.book;
        try {
            await Book.create({ name: name, 
                description: desc, 
                price: price, 
                author: author, 
                // owner: new ObjectId(req.session.user.id)
                owner: new ObjectId(req.user._id)
            })
            res.status(200).json({success:true})
        } catch(err) {
            console.log(err);
            res.status(500).json({ success:false });
        }
    },

    listedBooks: async(req, res, next) => {
        try {
            const listed_books = await Book.find().select('_id name description price author')
            res.status(200).json(listed_books);
        } catch(err) {
            console.log(err)
            res.status(404).json({'message': false})
        }
    },

    myBooks: async(req, res, next) => {
        try {
            const booksCreatedByUser = await Book.find({ owner: req.user._id }).select('_id name description price author')
            res.status(200).json(booksCreatedByUser);
        } catch(err) {
            console.log(err)
            res.status(404).json({'message': false})
        }
    },

    editBook: async(req, res, next) => {
        const { _id, name, price, author, description } = req.body;
        
        try {
            const book = await Book.findById(_id);
            // Check user is the owner of book.
            if(!req.user._id.toString() === book.owner.toString()) {
                return res.status(403).json({ status: false, message: 'Operation not Allowed' })
            }

            book.name = name;
            book.price = price;
            book.author = author;
            book.description = description;
    
            await book.save();
            res.status(200).json({ 
                status : true, 
                book: {
                    author: book.author,
                    name: book.name,
                    price: book.price,
                    description: book.description
                },
            });
        } catch(err) {
            res.status(500).json({ message: 'Internal Server Error', status: false})
        }
    },

    bookDetails: async(req, res, next) => {
        try {
            const bookId = req.body.bookId;
            const bookDetails = await Book.findById(bookId)
            res.status(200).json(bookDetails);
        } catch(err) {
            console.log(err)
            res.status(404).json({ message: 'not found'})
        }
    },

    headerPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'header.html'));
    },

    myBooksPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'my-books.html'));
    },

    landingPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'index.html'));
    },

    homePage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'dashboard.html'));
    },
    
    signUpPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'sign-up.html'));
    },

    signInPage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'sign-in.html'));
    },

    signUpUser: async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const userExists = await User.findOne( {
                where: { email: email }
            })
            if( userExists ) { return res.status(409).json({ userExists: true }) }

            const saltrounds = 10;
            const encryptedPassword = await bcrypt.hash(password, saltrounds)
            await User.create( { name: name, email: email, password: encryptedPassword })
            console.log('New user signed up')
            res.status(200).json( { message: 'User created successfully '})
            
        } catch( error ) {
            console.log('Error@signUpUser -> ', error);
            res.status(500).json({ error: "Internal Server Error " })
        }
    }, 

    signInUser: async(req, res, next) => {
        const { email, password } = req.body;
        try {
            const userExists = await User.findOne( { email: email } );
            if(!userExists) { return res.status(404).json( { error: "User not found" } ) }
            const passwordsMatch = await bcrypt.compare(password, userExists.password);
            if( passwordsMatch ) {
                req.session.user = { id: userExists.id, email: userExists.email } ;
                res.status(200).json( { success: true })
            } else {
                res.status(401).json( { success: false, message: "Credentials do not match" })
            }
        } catch( error ) {
            console.log('Error@signInUser -> ', error);
            res.status(500).json({ error: "Internal Server Error "})
        }
    },

    signOut: (req, res, next) => {
        req.session.destroy(() => {
            res.status(200).json({ success: true })
        });
    }
}

module.exports = viewController;
