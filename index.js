const Express = require('express');
const {getInstruments, getInstrumentDetail} = require('./db/queries/instrument')
const {getInitialHistoricPricePoints,
    getLastSessionActivityLevel,
    getRangedHistoricData,
    getLastYearsPriceYieldLimit} = require('./db/queries/historic')

const index = async () => {
    const app = Express();
    app.use(Express.json());
    console.log(await getLastYearsPriceYieldLimit('USP3699PGJ05', 'high'))
}

index();