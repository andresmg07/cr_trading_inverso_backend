const Express = require('express');
const {getInstruments, getInstrumentDetail} = require('./db/queries/instrument')

const index = async () => {
    const app = Express();
    app.use(Express.json());
    // await getInstruments(0,10, true, 'rate')
    await getInstrumentDetail('CRFCREDB0108')


}

index();