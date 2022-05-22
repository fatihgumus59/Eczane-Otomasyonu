const express = require('express');
const authController = require('../controllers/authController');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/register').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authMiddleware,authController.logoutUser);

// get admin
router.route('/manager').get(authMiddleware,pageController.getAllAdmin);
router.route('/manager/add').get(authMiddleware,pageController.getAdminAddPage);
router.route('/edit/:id').get(authMiddleware,pageController.getEditAdminPage);

//post admin
router.route('/manager/add').post(authMiddleware,authController.addAdmin);
router.route('/admin-ok/:id').put(authMiddleware,authController.adminOk); // confirmation true yapacak.
router.route('/pharmacy').post(authMiddleware,authController.addPharmacy); // eczane bilgisi ekleme
router.route('/pharmacy-select').put(authMiddleware,authController.selectPharmacy); // eczane seçme ve değiştirme

//update admin
router.route('/edit/:id').put(authMiddleware,authController.editAdmin);
router.route('/profile').put(authMiddleware,authController.editProfile); // profil bilgisi güncelleme
router.route('/pharmacy').put(authMiddleware,authController.editPharmacy); // eczane bilgisi güncelleme

//delete admin
router.route('/edit/:id').delete(authMiddleware,authController.deleteAdmin);
router.route('/pharmacy/:id').delete(authMiddleware,authController.deletePharmacy); // eczane bilgisi güncelleme

module.exports = router;