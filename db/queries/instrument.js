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
                ICC.COUNTRY_NAME,
                CC.CURRENCY_NAME,
                LSIPY.VECTOR_PRICE                
            FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID
                INNER JOIN CR_TRADING_SESSION_DATA.ISSUER_COUNTRY_CATALOG ICC ON ID.ISSUER_COUNTRY = ICC.COUNTRY_CODE
                INNER JOIN CR_TRADING_SESSION_DATA.LAST_SESSION_INSTRUMENT_PRICE_YIELD LSIPY ON ID.ISIN = LSIPY.ISIN
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

    getFeaturedInstruments:  ({feature, boundary}) => {

        const orderType = boundary === 'upper' ? 'DESC' : 'ASC'

        return new Promise(async (resolve, reject) => {
            const statement =
                `SELECT
                     ID.ISIN,
                     ID.INSTRUMENT_ISSUER,
                     ID.RATE,
                     ID.MATURITY,
                     ICC.COUNTRY_NAME,
                     CC.CURRENCY_NAME,
                     LSIPY.VECTOR_PRICE,
                     LSIPY.VECTOR_YIELD
                 FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                          INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID
                          INNER JOIN CR_TRADING_SESSION_DATA.ISSUER_COUNTRY_CATALOG ICC ON ID.ISSUER_COUNTRY = ICC.COUNTRY_CODE
                          INNER JOIN CR_TRADING_SESSION_DATA.LAST_SESSION_INSTRUMENT_PRICE_YIELD LSIPY ON ID.ISIN = LSIPY.ISIN
                 WHERE
                     ID.MATURITY > CURRENT_DATE() AND 
                     ID.IS_ACTIVE AND 
                     LSIPY.VECTOR_PRICE < 500 AND 
                     LSIPY.VECTOR_PRICE > 50.0
                 ORDER BY
                     CASE
                         WHEN '${feature}' = 'maturity' THEN ID.MATURITY
                         END ${orderType},
                     CASE
                         WHEN '${feature}' = 'rate' THEN ID.RATE
                         END ${orderType},
                     CASE
                         WHEN '${feature}' = 'yield' THEN LSIPY.VECTOR_YIELD
                         END ${orderType},
                     CASE
                         WHEN '${feature}' = 'price' THEN LSIPY.VECTOR_PRICE
                         END ${orderType}
                 LIMIT 3;`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })
    },

    getInstrumentDetail: ({isin}) => {
        return new Promise( async (resolve, reject) => {
            const statement =
                `SELECT
                    ID.ISIN,
                    ID.SERIES,
                    ID.INSTRUMENT_ISSUER,                    
                    ID.INSTRUMENT_TYPE,                    
                    ID.PERIODICITY,
                    ID.RATE,
                    ID.PRIZE,
                    ID.MATURITY,
                    ID.BUY_BACK,
                    ICC.COUNTRY_NAME,
                    ID.IS_ACTIVE,
                    ID.ISSUANCE_TYPE,
                    ID.OFFICIAL,
                    CC.CURRENCY_NAME,
                    ID.APPROVED_AMOUNT,
                    ID.PLACED_AMOUNT,
                    ID.LAST_SESSION_DATE,
                    ID.FIRST_SESSION_DATE                    
                FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                        INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID
                        INNER JOIN CR_TRADING_SESSION_DATA.ISSUER_COUNTRY_CATALOG ICC ON ID.ISSUER_COUNTRY = ICC.COUNTRY_CODE
                 WHERE ID.ISIN = '${isin}';`
            try{
                resolve((await pool.query(statement))[0][0]);
            }catch (e){
                reject(e)
            }
        })
    },

    instrumentSearchSuggestions: ({term}) => {
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
                    ID.ISIN LIKE '%${term}%' OR                    
                    ID.INSTRUMENT_ISSUER LIKE '%${term}%' OR
                    ICC.COUNTRY_NAME LIKE '%${term}%' OR
                    ID.ISSUER_COUNTRY LIKE '%${term}%'
                LIMIT 5;`
            try{
                resolve((await pool.query(statement))[0]);
            }catch (e){
                reject(e)
            }
        })

    }
}