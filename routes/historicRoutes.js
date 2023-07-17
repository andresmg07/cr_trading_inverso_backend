const router = require('express').Router();

const instrumentController = require('../controllers/historicControllers')

router.get('/initial/:isin', instrumentController.getInitialHistoricPricePoints);
router.get('/complementary/:isin', instrumentController.getComplementaryHistory);
router.get('/ranged/:isin/:range/:limit', instrumentController.getRangedHistoricPricePoints);

module.exports  = router;