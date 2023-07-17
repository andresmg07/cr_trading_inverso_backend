const {
    getInitialHistoricPricePoints,
    getRangedHistoricPricePoints,
    getPriceYieldLimits,
    getLastSessionActivityLevel} = require('../db/queries/historic')
const {formatHistoricPricePoints, formatPriceYieldLimits} = require("../util/responseFormatter");

module.exports = {
    getInitialHistoricPricePoints: (req, res) => {
        const payload = req.params;
        getInitialHistoricPricePoints(payload).then((points) => {
            return res.status(200).json(formatHistoricPricePoints(points))
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
    getRangedHistoricPricePoints: (req, res) => {
        const payload = req.params;
        getRangedHistoricPricePoints(payload).then((points) => {
            return res.status(200).json(formatHistoricPricePoints(points))
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
    getComplementaryHistory: (req, res) => {
        const lastSessionActivityPayload = {isin: req.params.isin};
        const longAgoDate = (new Date(new Date().setFullYear(new Date().getFullYear() - 10))).toISOString()
        const oneYearAgoDate = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString()
        const lastYearsLimitsPayload = {...req.params, backInTimeFromNow: oneYearAgoDate};
        const absoluteLimitsPayload = {...req.params, backInTimeFromNow: longAgoDate};
        getLastSessionActivityLevel(lastSessionActivityPayload).then((lastSessionActivityLevel) => {
            getPriceYieldLimits(lastYearsLimitsPayload).then((lastYearsPriceYieldLimits) => {
                getPriceYieldLimits(absoluteLimitsPayload).then((absolutePriceYieldLimits) => {
                    return res.status(200).json({
                        lastSessionActivityLevel,
                        lastYearsPriceYieldLimits: formatPriceYieldLimits(lastYearsPriceYieldLimits),
                        absolutePriceYieldLimits: formatPriceYieldLimits(absolutePriceYieldLimits)
                    })
                }).catch((error) => {
                    return res.status(500).json({error});
                })
            }).catch((error) => {
                return res.status(500).json({error});
            })
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
}