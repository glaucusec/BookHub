const express = require('express');
const controller = require('../controllers/controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', controller.landingPage);

router.get('/dashboard', authenticate.authenticate, controller.dashBoard);

router.get('/books', authenticate.authenticate, controller.listedBooks)

router.get('/addbook', authenticate.authenticate, controller.addBookPage);

router.post('/addbook', authenticate.authenticate, controller.addBook);

router.get('/mybooks', authenticate.authenticate, controller.myBooksPage);

router.post('/mybooks', authenticate.authenticate, controller.myBooks);

router.post('/editbook', authenticate.authenticate, controller.editBook);

router.post('/bookdetails', controller.bookDetails);

router.get('/header', controller.headerPage);

router.get('/signin', controller.signInPage);

router.post('/signin', controller.signInUser);

router.get('/signup', controller.signUpPage);

router.post('/signup', controller.signUpUser);

router.post('/signout', controller.signOut);

module.exports = router;