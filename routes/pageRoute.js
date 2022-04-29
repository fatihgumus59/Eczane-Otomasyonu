const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware,pageController.getIndexPage);
router.route('/notlar').get(authMiddleware,pageController.getNotesPage);
router.route('/invoice/:id').get(authMiddleware,pageController.getProforma); // sadece yöneticilere açık fatura
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);

module.exports = router;
