const pool = require('../pool')

module.exports = {
    getInstruments: async (range, limit, retrieveAll, sortParam) => {
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
                LSIP.VECTOR_PRICE                
            FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA ID
                INNER JOIN CR_TRADING_SESSION_DATA.CURRENCY_CATALOG CC ON ID.CURRENCY = CC.CURRENCY_ID
                INNER JOIN CR_TRADING_SESSION_DATA.ISSUER_COUNTRY_CATALOG ICC ON ID.ISSUER_COUNTRY = ICC.COUNTRY_CODE
                INNER JOIN CR_TRADING_SESSION_DATA.LAST_SESSION_INSTRUMENT_PRICE LSIP ON ID.ISIN = LSIP.ISIN
             WHERE ${retrieveAll} OR (ID.MATURITY > CURRENT_DATE() AND ID.IS_ACTIVE)
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

        const [rows] = await pool.query(statement);
        console.log(rows)
    },

    getInstrumentDetail: async (isin) => {
        const statement = `SELECT * FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA WHERE ISIN='${isin}'`
        const [rows] = await pool.query(statement);
        console.log(rows)
    }
}