const pool = require('../pool')

module.exports = {
    getInitialHistoricPricePoints: async (isin) => {
        const tableName = isin.toUpperCase() + '_HISTORY'
        const statement = `
            SELECT
                SESSION_DATE,
                VECTOR_PRICE,
                VECTOR_YIELD
            FROM CR_TRADING_SESSION_DATA.${tableName} ORDER BY SESSION_DATE DESC LIMIT 5;`
        const [rows] = await pool.query(statement);
        return rows
    },

    getRangedHistoricPricePoints: async (isin, range, limit) => {
        const tableName = isin.toUpperCase() + '_HISTORY'
        const statement = `
            SELECT
                SESSION_DATE,
                VECTOR_PRICE,
                VECTOR_YIELD              
            FROM CR_TRADING_SESSION_DATA.${tableName} ORDER BY SESSION_DATE LIMIT ${limit} OFFSET ${range};`
        const [rows] = await pool.query(statement);
        return rows
    },

    getLastSessionActivityLevel: async (isin) => {
        const tableName = isin.toUpperCase() + '_HISTORY'
        const activityLevelColumn = isin.toUpperCase() + '_CURRENT_ACTIVITY_LEVEL'
        const statement = `
            SELECT
                LC.LEVEL              
            FROM CR_TRADING_SESSION_DATA.${tableName} H
            INNER JOIN CR_TRADING_SESSION_DATA.LEVEL_CATALOG LC ON H.${activityLevelColumn} = LC.LEVEL_ID
            ORDER BY H.SESSION_DATE DESC LIMIT 1;`
        return (await pool.query(statement))[0][0];
    },

    getLastYearsPriceYieldLimit: async (isin, priceLimit) => {
        const tableName = isin.toUpperCase() + '_HISTORY'
        const orderType = priceLimit === 'high' ? 'DESC' : 'ASC'
        const statement = `
            SELECT
                SESSION_DATE,
                VECTOR_PRICE,
                VECTOR_YIELD
            FROM CR_TRADING_SESSION_DATA.${tableName}
            ORDER BY VECTOR_PRICE ${orderType}
            LIMIT 1;`
        return (await pool.query(statement))[0];
    },

}