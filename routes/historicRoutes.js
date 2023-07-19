const router = require('express').Router();

const instrumentController = require('../controllers/historicControllers')

router.get('/initial/:isin/:initialTargetOffset', instrumentController.getInitialHistoricPricePoints);
router.get('/complementary/:isin', instrumentController.getComplementaryHistory);
router.get('/ranged/:isin/:targetLimitDate/:currentLimitDate', instrumentController.getRangedHistoricPricePoints);

module.exports  = router;