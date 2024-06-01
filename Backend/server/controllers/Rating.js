const Ratings = require('../models/Ratings')
const Transactions = require('../models/Transactions')

const RatingController = {
    AddRate: async (req, res) => {
        try {
            const { transactionId, userId, storeId, productId, ratings } = req.body

            const rated = await Ratings.create({ transactionId, userId, storeId, productId, ratings })

            if (rated) {
                const updateTransactionToComplete = await Transactions.findByIdAndUpdate(
                    transactionId,
                    {
                        "checkout.status": "COMPLETED"
                    },
                    {
                        new: true
                    }
                )
                if (updateTransactionToComplete) {
                    res.json({ success: true, message: 'Product successfully rated!' })
                } else {
                    res.json({ success: false, message: 'Product failed to update rate' })
                }
            } else {
                res.json({ success: false, message: 'Product failed to rate' })
            }

        } catch (error) {
            res.json({ success: false, message: `Error adding product controller: ${error}`, error: error })
        }
    }
}

module.exports = RatingController