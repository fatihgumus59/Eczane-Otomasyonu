const express = require('express');
const pageController = require('../controllers/pageController');
const debtController = require('../controllers/debtController');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(authMiddleware,debtController.getAllDebt);
router.route('/api').get(pageController.getAllDebtApi);
router.route('/borc-ekle').get(authMiddleware,pageController.getDebtAddPage);
router.route('/borc-ekle').post(authMiddleware,debtController.createDebt);
router.route('/api/edit/:id').get(authMiddleware,debtController.getEditDebtPageApi);
router.route('/edit/:id').get(authMiddleware,pageController.getEditDebtPage);
router.route('/:id').put(authMiddleware,debtController.editDebt);
router.route('/:id').delete(debtController.deleteDebt);
router.route('/odenmis').get(authMiddleware,debtController.getDebtPaid);
router.route('/odenmemis').get(authMiddleware,debtController.getDebtUnpaid);
router.route('/debt-ok/:id').put(authMiddleware,debtController.debtOk);

module.exports = router;
