module.exports = {
    formatFeaturedInstruments: (response) => {
        return response.map((instrument) => {
            return {
                isin:instrument.ISIN,
                issuer:instrument.INSTRUMENT_ISSUER,
                rate:instrument.RATE === null ? 0 : instrument.RATE,
                price:instrument.VECTOR_PRICE === null ? 0 : instrument.VECTOR_PRICE,
                yield:instrument.VECTOR_YIELD === null ? 0 : instrument.VECTOR_YIELD,
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
            status:instrument.IS_ACTIVE,
            issuanceType:instrument.ISSUANCE_TYPE,
            official:instrument.OFFICIAL,
            currency:instrument.CURRENCY_NAME,
            approvedAmount:instrument.APPROVED_AMOUNT,
            placedAmount:instrument.PLACED_AMOUNT,
            lastSessionDate:instrument.LAST_SESSION_DATE,
            firstSessionDate:instrument.FIRST_SESSION_DATE,
            price:instrument.VECTOR_PRICE === null ? 0 : instrument.VECTOR_PRICE,
            yield:instrument.VECTOR_YIELD === null ? 0 : instrument.VECTOR_YIELD
        })
    },

    formatSearchSuggestions: (response) => {
        return response.map((suggestion) => {
            return ({
                isin: suggestion.ISIN,
                issuer: suggestion.INSTRUMENT_ISSUER,
                rate:suggestion.RATE === null ? 0 : suggestion.RATE,
                maturity: suggestion.MATURITY,
                status: suggestion.IS_ACTIVE,
                country: suggestion.COUNTRY_NAME,
                currency: suggestion.CURRENCY_NAME
            });
        });
    },

    formatInstrumentAllInstruments: (response) => {
        return response.map((instrument) => {
            return ({
                isin:instrument.ISIN,
                status:instrument.IS_ACTIVE,
                issuer:instrument.INSTRUMENT_ISSUER,
                rate:instrument.RATE === null ? 0 : instrument.RATE,
                maturity:instrument.MATURITY,
                lastSessionDate:instrument.LAST_SESSION_DATE,
                firstSessionDate:instrument.FIRST_SESSION_DATE,
                country:instrument.COUNTRY_NAME,
                currency:instrument.CURRENCY_NAME,
                price:instrument.VECTOR_PRICE === null ? 0 : instrument.VECTOR_PRICE,
            });
        });
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