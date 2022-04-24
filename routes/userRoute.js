const express = require('express');
const pageController = require('../controllers/pageController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//get
router.route('/').get(authMiddleware,pageController.getAllUserPage);
router.route('/kullanici-ekle').get(authMiddleware,pageController.getUserAddPage);
router.route('/edit/:id').get(authMiddleware,pageController.getEditUserPage);

//post
router.route('/kullanici-ekle').post(authMiddleware,userController.createUser);

//update
router.route('/edit/:id').put(authMiddleware,userController.editUser);

//delete
router.route('/edit/:id').delete(authMiddleware,userController.deleteUser);

module.exports = router;
