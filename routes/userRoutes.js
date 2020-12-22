const express = require('express');
const router = express.Router();

const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.route('/login').get(authController.getLogin).post(authController.postLogin);

router.get('/logout', authController.logout);

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/account').get(userController.getAccount).post(userController.postAccount);

module.exports = router;