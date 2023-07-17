const {createPool} = require('mysql2/promise');
require('dotenv').config();

try{
    module.exports = createPool({
        host: process.env.REMOTE_DB_HOST,
        port: process.env.REMOTE_DB_PORT,
        user: process.env.REMOTE_DB_USER,
        database: process.env.REMOTE_DB_DATABASE,
        password: process.env.REMOTE_DB_PASSWORD,
        waitForConnections: true,
        enableKeepAlive: true,
        multipleStatements: true,
        connectionLimit: 10
    });
    console.log('New MySQL pool created.');
}catch(err) {
    console.error(err);
}


