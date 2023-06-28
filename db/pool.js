const {createPool} = require('mysql2/promise');
require('dotenv').config();

try{
    module.exports = createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        enableKeepAlive: true,
        multipleStatements: true,
        connectionLimit: 10
    });
    console.log('New MySQL pool created.');
}catch(err) {
    console.error(err);
}


