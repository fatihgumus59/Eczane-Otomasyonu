const express = require('express');
const apiController = require('../controllers/apiController');
const pageController = require('../controllers/pageController');

const authMiddleware = require('../middlewares/authMiddleware');
const ApiMiddleware = require('../middlewares/apiMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware,pageController.getApiPage);
router.route('/create').post(authMiddleware,apiController.createApi);

// get
router.route('/debts').get(ApiMiddleware,apiController.getDebtPage);
router.route('/medicine').get(ApiMiddleware,apiController.getMedicinePage);
router.route('/debts-details').get(ApiMiddleware,apiController.getDebtDetailsPage);
router.route('/medicine-details').get(ApiMiddleware,apiController.getMedicineDetailPage);
router.route('/edit/:id').get(authMiddleware,pageController.getEditApiPage);

// put 
router.route('/edit').put(authMiddleware,apiController.editApi);
router.route('/ok').put(authMiddleware,apiController.okApi);

// delete 
router.route('/:id').delete(authMiddleware,apiController.deleteApi);

module.exports = router;
