const router = require('express').Router();

const instrumentController = require('../controllers/instrumentControllers')

router.get('/:range/:limit/:retrieveAll/:sortParam', instrumentController.getInstruments);
router.get('/:isin', instrumentController.getInstrumentDetail);
router.get('/search/:search', instrumentController.instrumentSearch);

module.exports  = router;