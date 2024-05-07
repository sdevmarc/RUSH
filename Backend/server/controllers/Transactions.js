const Transactions = require('../models/Transactions')
const Stores = require('../models/Stores')
const Products = require('../models/Products')

const TransactionController = {
    CreateTransaction: async (req, res) => {
        try {
            const values = req.body

            const data = await Transactions.create(values)
            console.log(data)
            if (data) {
                res.json({ success: true, message: `Transaction added successfully!` })
            } else {
                res.json({ success: false, message: `Transaction not added!` })
            }

        } catch (error) {
            res.json({ success: false, message: `Error creating Transaction controller: ${error}` })
        }
    },
    ViewTransactions: async (req, res) => {
        try {
            const { sellerId } = req.params;
            let pending = 0, cancelled = 0, unreturned = 0, completed = 0
            const transactions = await Transactions.find({ sellerId: sellerId });

            if (transactions.length > 0) {
                const data = []
                for (const transaction of transactions) {
                    const product = await Products.findById(transaction.productId);
                    const store = await Stores.findById(transaction.sellerId);
                    data.push({
                        transaction: transaction,
                        product: product,
                        store: store
                    })

                    if (transaction.checkout.status === "PENDING") {
                        pending++;
                    }

                    if (transaction.checkout.status === "CANCELLED") {
                        cancelled++;
                    }

                    if (transaction.checkout.status === "UNRETURNED") {
                        unreturned++;
                    }

                    if (transaction.checkout.status === "COMPLETED") {
                        completed++;
                    }
                }

                res.json({ success: true, message: `Transactions retrieved successfully!`, data, statusCount: { pending, cancelled, unreturned, completed } });
            } else {
                res.json({ success: false, message: `There are no transactions made for the specified seller.` });
            }
        } catch (error) {
            res.json({ success: false, message: `Error viewing status Transaction controller: ${error}` });
        }
    },
    UpdateStatusTransaction: async (req, res) => {
        try {
            const { transactionId, status } = req.params

            const data = await Transactions.findByIdAndUpdate(transactionId, { "checkout.status": `${status}` }, { new: true })
            if (data) {
                res.json({ success: true, message: `Transactions updated to ${status} successfully!`, data })
            } else {
                res.json({ success: false, message: `Transactions did not updated to ${status}.` })
            }
        } catch (error) {
            res.json({ success: false, message: `Error Updating status to ${status} Transaction controller: ${error}` })
        }
    }
}

module.exports = TransactionController