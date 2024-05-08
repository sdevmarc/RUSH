const Transactions = require('../models/Transactions')
const Stores = require('../models/Stores')
const Products = require('../models/Products')
const Users = require('../models/Users')

const TransactionController = {
    CreateTransaction: async (req, res) => {
        try {
            const values = req.body
            const data = await Transactions.create(values)
            if (data) {
                res.json({ success: true, message: `Transaction added successfully!` })
            } else {
                res.json({ success: false, message: `Transaction not added!` })
            }

        } catch (error) {
            res.json({ success: false, message: `Error creating Transaction controller: ${error}` })
        }
    },
    ViewStatusTransactions: async (req, res) => {
        try {
            const { sellerId, status } = req.params
            const transactions = await Transactions.find({ sellerId: sellerId, "checkout.status": status })

            if (transactions.length > 0) {
                const data = []
                for (const transaction of transactions) {
                    const product = await Products.findById(transaction.productId)
                    const store = await Stores.findById(transaction.sellerId)
                    data.push({
                        transaction: transaction,
                        product: product,
                        store: store
                    })
                }
                res.json({ success: true, message: `${status} transactions retrieved successfully!`, data })
            } else {
                res.json({ success: false, message: `There are no ${status} transactions for the specified seller.` })
            }
        } catch (error) {
            res.json({ success: false, message: `Error viewing ${status} transactions: ${error}` })
        }
    },

    ViewTransactions: async (req, res) => {
        try {
            const { sellerId } = req.params
            let pending = 0, cancelled = 0, unreturned = 0, completed = 0
            const transactions = await Transactions.find({ sellerId: sellerId })

            if (transactions.length > 0) {
                const data = []
                for (const transaction of transactions) {
                    const product = await Products.findById(transaction.productId)
                    const store = await Stores.findById(transaction.sellerId)
                    data.push({
                        transaction: transaction,
                        product: product,
                        store: store
                    })

                    if (transaction.checkout.status === "PENDING") {
                        pending++
                    }

                    if (transaction.checkout.status === "CANCELLED") {
                        cancelled++
                    }

                    if (transaction.checkout.status === "UNRETURNED") {
                        unreturned++
                    }

                    if (transaction.checkout.status === "COMPLETED") {
                        completed++
                    }
                }

                res.json({ success: true, message: `Transactions retrieved successfully!`, data, statusCount: { pending, cancelled, unreturned, completed } })
            } else {
                res.json({ success: false, message: `There are no transactions made for the specified seller.` })
            }
        } catch (error) {
            res.json({ success: false, message: `Error viewing status Transaction controller: ${error}` })
        }
    },
    ViewSelectedTransaction: async (req, res) => {
        try {
            const { transactionId } = req.params

            const transaction = await Transactions.findById(transactionId)

            if (!transaction) {
                return res.json({ success: false, message: `Transaction not found` })
            }

            const product = await Products.findById(transaction.productId)
            const store = await Stores.findById(transaction.sellerId)
            const { personalDetails, contactno } = await Users.findById(transaction.userId)

            const data = {
                transaction: transaction,
                product: product,
                store: store,
                user: { personalDetails, contactno }
            }

            res.json({ success: true, message: `Transaction details retrieved successfully!`, data })
        } catch (error) {
            res.json({ success: false, message: `Error viewing selected transaction: ${error}` })
        }
    },
    UpdateStatusTransaction: async (req, res) => {
        try {
            const { transactionId, status } = req.body

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