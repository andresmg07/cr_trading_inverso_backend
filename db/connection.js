const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = {
    connectMySQL : () => {
        try{
            const sequelize = new Sequelize(
                process.env.DB_DATABASE,
                process.env.DB_USER,
                process.env.DB_PASSWORD,
                {
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    logging: console.log,
                    maxConcurrentQueries: 100,
                    dialect: 'mysql',
                    pool: { maxConnections: 5, maxIdleTime: 30},
                    language: 'en',
                }
            );
            console.log('MySQL connection established');
            sequelize.authenticate();
            return sequelize;
        }catch(err) {
            console.error(err);
        }
        return null;
    }
}