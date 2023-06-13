const express = require('express');
const controller = require('../controllers/controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', controller.landingPage);

router.get('/dashboard', authenticate.authenticate, controller.dashBoard);

router.get('/books', authenticate.authenticate, controller.listedBooks)

router.get('/add-book', authenticate.authenticate, controller.addBookPage);

router.post('/add-book', authenticate.authenticate, controller.addBook);

router.get('/my-books', authenticate.authenticate, controller.myBooksPage);

router.post('/my-books', authenticate.authenticate, controller.myBooks);

router.post('/book-details', controller.bookDetails);

router.get('/header', controller.headerPage);

router.get('/sign-in', controller.signInPage);

router.post('/sign-in', controller.signInUser);

router.get('/sign-up', controller.signUpPage);

router.post('/sign-up', controller.signUpUser);

router.post('/sign-out', controller.signOut);

module.exports = router;