const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.homePage);

router.get('/sign-in', controller.signIn);

router.get('/sign-up', controller.signUp);

router.post('/sign-up', controller.signUpUser);

module.exports = router;