const {
    getInitialHistoricPricePoints,
    getRangedHistoricPricePoints,
    getLastYearsPriceYieldLimits,
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
        const payload = req.params;
        let lastSessionActivityLevel = ''
        let lastYearsPriceYieldLimits = {}
        getLastSessionActivityLevel(payload).then((activity) => {
            console.log(activity)
            lastSessionActivityLevel = activity
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
        getLastYearsPriceYieldLimits(payload).then((limits) => {
            lastYearsPriceYieldLimits = limits
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
        console.log(lastSessionActivityLevel)

        return res.status(200).json({
            status:true,
            data: {
                lastSessionActivityLevel,
                lastYearsPriceYieldLimits
            },
        })
    },
}