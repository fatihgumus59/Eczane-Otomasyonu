const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const authValidation = require('../validations/authValidation'); // validasyon işlemi için schema
const validateMiddleware = require('../middlewares/validateMiddleware'); // validasyon middleware

const router = express.Router();

router.route('/register').post(validateMiddleware(authValidation.createUserValidation),authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authMiddleware,authController.logoutUser);

module.exports = router;