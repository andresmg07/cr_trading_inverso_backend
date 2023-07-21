const router = require('express').Router();

const instrumentController = require('../controllers/instrumentControllers')

router.get('/all/:lastRetrievedIndex/:limit/:retrieveAll/:searchTerm/:sortParam/:sortType', instrumentController.getInstruments);
router.get('/featured/:feature/:boundary', instrumentController.getFeaturedInstruments);
router.get('/detail/:isin', instrumentController.getInstrumentDetail);
router.get('/search/:term', instrumentController.instrumentSearchSuggestions);

module.exports  = router;