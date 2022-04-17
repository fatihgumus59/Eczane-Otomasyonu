const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware,pageController.getIndexPage);
router.route('/notlar').get(authMiddleware,pageController.getNotesPage);
router.route('/yazdir/:id').get(authMiddleware,pageController.getProforma);
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);

module.exports = router;
