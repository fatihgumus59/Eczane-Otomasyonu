const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const pendingMiddleware = require('../middlewares/pendingMiddleware');

const router = express.Router();

router.route('/').get(pendingMiddleware,pageController.getIndexPage); // hem giriş kontrolü hemde eğer kullanıcı rolü pending ise profil ekranına atacak
router.route('/notlar').get(authMiddleware,pageController.getNotesPage);
router.route('/yazdir/:id').get(authMiddleware,pageController.getProforma); // sadece yöneticilere açık fatura
router.route('/invoice/:id').get(authMiddleware,pageController.getPublicProforma); // herkese açık fatura
router.route('/login').get(redirectMiddleware,pageController.getLoginPage);
router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);
router.route('/profile').get(authMiddleware,pageController.getProfile);
router.route('/pharmacy').get(authMiddleware,pageController.getPharmacyPage);

module.exports = router;
