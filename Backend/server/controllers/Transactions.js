const Transactions = require('../models/Transactions')

const TransactionController = {
    CreateTransaction: async (req, res) => {
        try {
            const values = req.body

            const data = await Transactions.create(values)
            console.log(data)
            if(data) {
                res.json({ success: true, message: `Transaction added successfully!` })
            } else {
                res.json({ success: false, message: `Transaction not added!` })
            }
      
        } catch (error) {
            res.json({ success: false, message: `Error creating Transaction controller: ${error}` })
        }
    }
}

module.exports = TransactionController