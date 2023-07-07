const {
    getInitialHistoricPricePoints,
    getRangedHistoricPricePoints,
    getPriceYieldLimits,
    getLastSessionActivityLevel} = require('../db/queries/historic')

module.exports = {
    getInitialHistoricPricePoints: (req, res) => {
        const payload = req.params;
        getInitialHistoricPricePoints(payload).then((points) => {
            return res.status(200).json({
                status:true,
                data: points,
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    },
    getRangedHistoricPricePoints: (req, res) => {
        const payload = req.params;
        getRangedHistoricPricePoints(payload).then((points) => {
            return res.status(200).json({
                status:true,
                data: points,
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    },
    getComplementaryHistory: (req, res) => {
        const lastSessionActivityPayload = {isin: req.params.isin};
        const lastYearsLimitsPayload = req.params;
        const longAgoDate = (new Date(new Date().setFullYear(new Date().getFullYear() - 10))).toISOString()
        const absoluteLimitsPayload = {...req.params, backInTimeFromNow: longAgoDate};
        getLastSessionActivityLevel(lastSessionActivityPayload).then((lastSessionActivityLevel) => {
            getPriceYieldLimits(lastYearsLimitsPayload).then((lastYearsPriceYieldLimits) => {
                getPriceYieldLimits(absoluteLimitsPayload).then((absolutePriceYieldLimits) => {
                    return res.status(200).json({
                        status:true,
                        data: {
                            lastSessionActivityLevel,
                            lastYearsPriceYieldLimits,
                            absolutePriceYieldLimits
                        },
                    })
                }).catch((error) => {
                    return res.status(500).json({
                        status: false,
                        error: error,
                    });
                })
            }).catch((error) => {
                return res.status(500).json({
                    status: false,
                    error: error,
                });
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    },
}