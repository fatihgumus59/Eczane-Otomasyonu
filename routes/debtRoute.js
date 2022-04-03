const express = require('express');
const pageController = require('../controllers/pageController');
const debtController = require('../controllers/debtController');

const router = express.Router();

router.route('/').get(debtController.getAllDebt);
router.route('/borc-ekle').get(pageController.getDebtAddPage);
router.route('/borc-ekle').post(debtController.createDebt);
router.route('/edit/:id').get(pageController.getEditDebtPage);
router.route('/:id').put(debtController.editDebt);
router.route('/:id').delete(debtController.deleteDebt);

module.exports = router;
