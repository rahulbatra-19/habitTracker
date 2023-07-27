const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');


router.get('/', userController.signIn);
router.get('/sign-up', userController.signUp);
router.use('/users', require('./users'));
router.use('/habit', require('./habit'));


module.exports = router;
