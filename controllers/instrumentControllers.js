const {getInstruments, getInstrumentDetail, instrumentSearch} = require('../db/queries/instrument')

module.exports = {
    getInstruments: (req, res) => {
        const payload = req.params;
        getInstruments(payload).then((instruments) => {
            return res.status(200).json({
                status:true,
                data: instruments,
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    },
    getInstrumentDetail: (req, res) => {
        const payload = req.params;
        getInstrumentDetail(payload).then((detail) => {
            return res.status(200).json({
                status:true,
                data: detail,
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    },
    instrumentSearch: (req, res) => {
        const payload = req.params;
        instrumentSearch(payload).then((result) => {
            console.log(result)
            return res.status(200).json({
                status:true,
                data: result,
            })
        }).catch((error) => {
            return res.status(500).json({
                status: false,
                error: error,
            });
        })
    }
}