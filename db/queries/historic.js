const pool = require('../pool')

module.exports = {
    retrieveHistoricDataPoints: async () => {
        const statement = 'SELECT\n' +
            '    INSTRUMENT_ISSUER,\n' +
            '    ISIN,\n' +
            '    RATE,\n' +
            '    MATURITY,\n' +
            '    ISSUER_COUNTRY\n' +
            'FROM CR_TRADING_SESSION_DATA.INSTRUMENT_DATA WHERE ISIN=\'CRSCOTIB1623\';'
        const [rows] = await pool.query(statement);
        console.log(rows)
    },
}