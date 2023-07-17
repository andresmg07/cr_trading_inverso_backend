const {getPriceYieldLimits} = require("../db/queries/historic");
module.exports = {
    formatFeaturedInstruments: (response) => {
        return response.map((instrument) => {
            return {
                isin:instrument.ISIN,
                issuer:instrument.INSTRUMENT_ISSUER,
                rate:instrument.RATE,
                price:instrument.VECTOR_PRICE,
                yield:instrument.VECTOR_YIELD,
                maturity:instrument.MATURITY,
                country:instrument.COUNTRY_NAME,
                currency:instrument.CURRENCY_NAME,
            }
        })
    },

    formatInstrumentDetail: (instrument) => {
        return({
            isin:instrument.ISIN,
            series:instrument.SERIES,
            issuer:instrument.INSTRUMENT_ISSUER,
            instrumentType:instrument.INSTRUMENT_TYPE,
            peridiocity:instrument.PERIODICITY,
            rate:instrument.RATE,
            prize:instrument.PRIZE,
            maturity:instrument.MATURITY,
            buyBack:instrument.BUY_BACK,
            country:instrument.COUNTRY_NAME,
            isActive:instrument.IS_ACTIVE,
            issuanceType:instrument.ISSUANCE_TYPE,
            official:instrument.OFFICIAL,
            currency:instrument.CURRENCY_NAME,
            approvedAmount:instrument.APPROVED_AMOUNT,
            placedAmount:instrument.PLACED_AMOUNT,
            lastSessionDate:instrument.LAST_SESSION_DATE,
            firstSessionDate:instrument.FIRST_SESSION_DATE,
            price:instrument.VECTOR_PRICE,
            yield:instrument.VECTOR_YIELD
        })

    },

    formatHistoricPricePoints: (response) => {
        return response.map((point) => {
            return {
                sessionDate:point.SESSION_DATE,
                price:point.VECTOR_PRICE,
                yield:point.VECTOR_YIELD,
            }
        })
    },

    formatPriceYieldLimits: (response) => {
        return(response.map(limitValues => {
            return {
                sessionDate:limitValues.SESSION_DATE,
                price:limitValues.VECTOR_PRICE,
                yield:limitValues.VECTOR_YIELD,
            }
        }))
    }
}