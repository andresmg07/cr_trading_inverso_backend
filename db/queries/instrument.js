const pool = require('../pool')

module.exports = {
    getInstruments:  ({range, limit, retrieveAll, sortParam}) => {
        return new Promise(async (resolve, reject) => {
            const statement =
                `SELECT
                ID.ISIN,
                ID.IS_ACTIVE,
                ID.INSTRUMENT_ISSUER,
                ID.RATE,
                ID.MATURITY,
                ID.LAST_SESSION_DATE,
                ID.FIRST_SESSION_DATE,
                ID.ISSUER_COUNTRY,
                CC.CURRENCY_NAME,
                LSIP.VECTOR_PRICE                
            FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID                
                INNER JOIN CR_TRADING_SESSION_DATA.LAST_SESSION_INSTRUMENT_PRICE LSIP ON ID.ISIN = LSIP.ISIN
             WHERE 
                 (${retrieveAll} OR (ID.MATURITY > CURRENT_DATE() AND ID.IS_ACTIVE))                
             ORDER BY
                 CASE
                     WHEN '${sortParam}' = 'maturity' THEN MATURITY
                     END DESC,
                 CASE
                     WHEN '${sortParam}' = 'rate' THEN RATE
                     END DESC,
                 CASE
                     WHEN '${sortParam}' = 'price' THEN VECTOR_PRICE
                     END DESC,
                 CASE
                     WHEN '${sortParam}' = 'release' THEN FIRST_SESSION_DATE
                     END DESC,                 
                 CASE
                     WHEN '${sortParam}' IS NULL THEN FIRST_SESSION_DATE
                 END DESC
             LIMIT ${limit} OFFSET ${range};`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

    getInstrumentDetail: ({isin}) => {
        return new Promise( async (resolve, reject) => {
            const statement = `SELECT * FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA WHERE ISIN = '${isin}';`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

    instrumentSearch: ({search}) => {
        return new Promise( async (resolve, reject) => {
            const statement = `
                SELECT
                    ID.ISIN,
                    ID.INSTRUMENT_ISSUER,
                    ID.RATE,
                    ID.MATURITY,
                    ICC.COUNTRY_NAME,
                    CC.CURRENCY_NAME
                FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                     INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID
                     INNER JOIN CR_TRADING_SESSION_DATA.ISSUER_COUNTRY_CATALOG ICC ON ID.ISSUER_COUNTRY = ICC.COUNTRY_CODE
                WHERE
                    ID.ISIN LIKE '%${search}%' OR                    
                    ID.INSTRUMENT_ISSUER LIKE '%${search}%' OR
                    ICC.COUNTRY_NAME LIKE '%${search}%' OR
                    ID.ISSUER_COUNTRY LIKE '%${search}%'
                LIMIT 5;`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })

    }
}