const express = require('express');
const pageController = require('../controllers/pageController');
const debtController = require('../controllers/debtController');

const router = express.Router();

router.route('/').get(debtController.getAllDebt);
router.route('/api').get(pageController.getAllDebtApi);
router.route('/borc-ekle').get(pageController.getDebtAddPage);
router.route('/borc-ekle').post(debtController.createDebt);
router.route('/api/edit/:id').get(debtController.getEditDebtPageApi);
router.route('/edit/:id').get(pageController.getEditDebtPage);
router.route('/:id').put(debtController.editDebt);
router.route('/:id').delete(debtController.deleteDebt);
router.route('/odenmis').get(debtController.getDebtPaid);
router.route('/odenmemis').get(debtController.getDebtUnpaid);
router.route('/debt-ok/:id').put(debtController.debtOk);

module.exports = router;
