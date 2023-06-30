const router = require('express').Router();

const instrumentController = require('../controllers/historicControllers')

router.get('/:isin', instrumentController.getInitialHistoricPricePoints);
router.get('/complementary/:isin/:boundary', instrumentController.getComplementaryHistory);
router.get('/:isin/:range/:limit', instrumentController.getRangedHistoricPricePoints);

module.exports  = router;