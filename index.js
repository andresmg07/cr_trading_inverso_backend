const express = require('express');
const cors = require('cors')
const instrumentRoutes = require('./routes/instrumentRoutes')
const historicRoutes = require('./routes/historicRoutes')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/instruments', instrumentRoutes)
app.use('/historic', historicRoutes)
app.listen(process.env.API_PORT, () => {
    console.log('Server up on port: ' + process.env.API_PORT)
})