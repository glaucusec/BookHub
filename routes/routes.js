const express = require('express');
const controller = require('../controllers/controller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', controller.landingPage);

router.get('/dashboard', authenticate.authenticate, controller.dashBoard);

router.get('/add-book', authenticate.authenticate, controller.addBookPage);

router.post('/add-book', authenticate.authenticate, controller.addBook)

router.get('/sign-in', controller.signInPage);

router.post('/sign-in', controller.signInUser);

router.get('/sign-up', controller.signUpPage);

router.post('/sign-up', controller.signUpUser);

router.post('/sign-out', controller.signOut);

module.exports = router;