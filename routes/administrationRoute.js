const express = require('express');
const authController = require('../controllers/authController');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

const authValidation = require('../validations/authValidation'); // validasyon işlemi için schema
const validateMiddleware = require('../middlewares/validateMiddleware'); // validasyon middleware

const router = express.Router();

router.route('/register').post(validateMiddleware(authValidation.createUserValidation),authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authMiddleware,authController.logoutUser);

// get admin
router.route('/manager').get(authMiddleware,pageController.getAllAdmin);
router.route('/manager/add').get(authMiddleware,pageController.getAdminAddPage);
router.route('/edit/:id').get(authMiddleware,pageController.getEditAdminPage);

//post admin
router.route('/manager/add').post(authMiddleware,authController.createUser);
router.route('/admin-ok/:id').put(authMiddleware,authController.adminOk); // confirmation true yapacak.

//update admin
router.route('/edit/:id').put(authMiddleware,authController.editAdmin);

//delete admin
router.route('/edit/:id').delete(authMiddleware,authController.deleteAdmin);

module.exports = router;