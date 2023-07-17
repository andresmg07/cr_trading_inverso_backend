const pool = require('../pool')

module.exports = {
    getInitialHistoricPricePoints: async ({isin}) => {
        return new Promise(async (resolve, reject) => {
            const tableName = isin.toUpperCase() + '_HISTORY'
            const statement = `
                SELECT
                    SESSION_DATE,
                    VECTOR_PRICE,
                    VECTOR_YIELD
                FROM CR_TRADING_SESSION_DATA.${tableName} ORDER BY SESSION_DATE DESC LIMIT 5;`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

    getRangedHistoricPricePoints: async ({isin, range, limit}) => {
        return new Promise(async (resolve, reject) => {
            const tableName = isin.toUpperCase() + '_HISTORY'
            const statement = `
                SELECT
                    SESSION_DATE,
                    VECTOR_PRICE,
                    VECTOR_YIELD              
                FROM CR_TRADING_SESSION_DATA.${tableName} ORDER BY SESSION_DATE DESC LIMIT ${limit} OFFSET ${range};`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

    getLastSessionActivityLevel: async ({isin}) => {
        return new Promise(async (resolve, reject) => {
            const tableName = isin.toUpperCase() + '_HISTORY'
            const activityLevelColumn = isin.toUpperCase() + '_CURRENT_ACTIVITY_LEVEL'
            const statement = `
                SELECT
                    LC.LEVEL              
                FROM CR_TRADING_SESSION_DATA.${tableName} H
                INNER JOIN CR_TRADING_SESSION_DATA.LEVEL_CATALOG LC ON H.${activityLevelColumn} = LC.LEVEL_ID
                ORDER BY H.SESSION_DATE DESC LIMIT 1;`
            try{
                resolve((await pool.query(statement))[0][0]['LEVEL']);
            }catch (e){
                reject(e)
            }
        })
    },

    getPriceYieldLimits: async ({isin, backInTimeFromNow}) => {
        return new Promise(async (resolve, reject) => {
            const tableName = isin.toUpperCase() + '_HISTORY'
            const statement = `
                SELECT HIGHER.* FROM (
                    SELECT
                        HIGHER_TABLE.SESSION_DATE,
                        HIGHER_TABLE.VECTOR_PRICE,
                        HIGHER_TABLE.VECTOR_YIELD
                    FROM CR_TRADING_SESSION_DATA.${tableName} AS HIGHER_TABLE
                    WHERE HIGHER_TABLE.SESSION_DATE > '${backInTimeFromNow}' AND HIGHER_TABLE.VECTOR_PRICE IS NOT NULL
                    ORDER BY HIGHER_TABLE.VECTOR_PRICE DESC
                    LIMIT 1) AS HIGHER
                UNION
                SELECT LOWER.* FROM (
                    SELECT
                        LOWER_TABLE.SESSION_DATE,
                        LOWER_TABLE.VECTOR_PRICE,
                        LOWER_TABLE.VECTOR_YIELD
                    FROM CR_TRADING_SESSION_DATA.${tableName} AS LOWER_TABLE
                    WHERE LOWER_TABLE.SESSION_DATE > '${backInTimeFromNow}' AND LOWER_TABLE.VECTOR_PRICE IS NOT NULL
                    ORDER BY LOWER_TABLE.VECTOR_PRICE ASC
                    LIMIT 1) AS LOWER;`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

}