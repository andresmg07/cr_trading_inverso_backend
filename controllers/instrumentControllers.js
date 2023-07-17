const {getInstruments, getInstrumentDetail, instrumentSearchSuggestions, getFeaturedInstruments} = require('../db/queries/instrument')
const {formatFeaturedInstruments, formatInstrumentDetail} = require('../util/responseFormatter')
module.exports = {
    getInstruments: (req, res) => {
        const payload = req.params;
        getInstruments(payload).then((instruments) => {
            return res.status(200).json(instruments)
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
    getFeaturedInstruments: (req, res) => {
        const payload = req.params;
        getFeaturedInstruments(payload).then((instruments) => {
            return res.status(200).json(formatFeaturedInstruments(instruments))
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
    getInstrumentDetail: (req, res) => {
        const payload = req.params;
        getInstrumentDetail(payload).then((detail) => {
            return res.status(200).json(formatInstrumentDetail(detail))
        }).catch((error) => {
            return res.status(500).json({error});
        })
    },
    instrumentSearchSuggestions: (req, res) => {
        const payload = req.params;
        instrumentSearchSuggestions(payload).then((result) => {
            return res.status(200).json(result)
        }).catch((error) => {
            return res.status(500).json({error});
        })
    }
}