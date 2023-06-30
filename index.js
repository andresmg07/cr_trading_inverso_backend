const Express = require('express');
const instrumentRoutes = require('./routes/instrumentRoutes')
const historicRoutes = require('./routes/historicRoutes')
require('dotenv').config();

const app = Express();
app.use(Express.json());
app.use('/instruments', instrumentRoutes)
app.use('/historic', historicRoutes)
app.listen(process.env.API_PORT, () => {
    console.log('Server up on port: ' + process.env.API_PORT)
})