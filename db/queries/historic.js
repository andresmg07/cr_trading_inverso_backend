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

    getPriceYieldLimits: async ({isin, boundary, backInTimeFromNow}) => {
        return new Promise(async (resolve, reject) => {
            const tableName = isin.toUpperCase() + '_HISTORY'
            const orderType = boundary === 'upper' ? 'DESC' : 'ASC'
            const statement = `
                SELECT
                    SESSION_DATE,
                    VECTOR_PRICE,
                    VECTOR_YIELD
                FROM CR_TRADING_SESSION_DATA.${tableName}
                WHERE SESSION_DATE > '${backInTimeFromNow}'
                ORDER BY VECTOR_PRICE ${orderType}
                LIMIT 1;`
            try{
                resolve((await pool.query(statement))[0][0]);
            }catch (e){
                reject(e)
            }
        })
    },

}