const Reports = require('../models/Reports')

const ReportsController = {
    AddReport: async (req, res) => {
        try {
            const { userId, values } = req.body
            const { subject, concern } = values

            const Createreport = await Reports.create({ userId, subject, concern })
            if (Createreport) {
                res.json({ success: true, message: 'Your report has been submitted!', Createreport })
            } else {
                res.json({ success: fffalse, message: 'Failed to submit your report.' })
            }

        } catch (error) {
            res.json({ success: false, message: `Error Add Report controller: ${error}`, error: error })
        }
    }
}

module.exports = ReportsController