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
            const { Id, name, status } = req.params

            let transactions;
            if (name === 'seller') {
                transactions = await Transactions.find({ sellerId: Id, "checkout.status": status })
            }

            if (name === 'user') {
                transactions = await Transactions.find({ userId: Id, "checkout.status": status })
            }

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
                res.json({ success: false, message: `There are no ${status} transactions.` })
            }
        } catch (error) {
            res.json({ success: false, message: `Error viewing status transactions: ${error}` })
        }
    },
    ViewTransactions: async (req, res) => {
        try {
            const { Id, name } = req.params

            let pending = 0, cancelled = 0, unreturned = 0, completed = 0, review = 0, rating = 0

            let transactions

            if (name === 'sellerId') {
                transactions = await Transactions.find({ sellerId: Id })
            }

            if (name === 'userId') {
                transactions = await Transactions.find({ userId: Id })
            }

            if (transactions && transactions.length > 0) {
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

                    if (transaction.checkout.status === "REVIEW") {
                        review++
                    }

                    if (transaction.checkout.status === "RATING") {
                        rating++
                    }

                    if (transaction.checkout.status === "COMPLETED") {
                        completed++
                    }
                }

                res.json({ success: true, message: `Transactions retrieved successfully!`, data, statusCount: { pending, cancelled, unreturned, review, completed, rating } })
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
            const { transactionId, status } = req.body;

            const transaction = await Transactions.findByIdAndUpdate(
                transactionId,
                { "checkout.status": status },
                { new: true }
            );

            if (!transaction) {
                return res.json({ success: false, message: "Transaction not found" });
            }

            const { productId } = transaction;
            let updateProductStatus;
            let message;

            if (status === 'UNRETURNED') {
                updateProductStatus = await Products.findByIdAndUpdate(
                    productId,
                    { "productInformation.isAvailable": "Not Available" },
                    { new: true }
                );
                message = `Transaction updated to ${status} and product set to Not Available successfully!`;
            } else if (status === 'RATING') {
                updateProductStatus = await Products.findByIdAndUpdate(
                    productId,
                    { "productInformation.isAvailable": "Available" },
                    { new: true }
                );
                message = `Transaction updated to ${status} and product set to Available successfully!`;
            } else {
                message = `Transaction updated to ${status} successfully!`;
            }

            if (updateProductStatus || status !== 'UNRETURNED' && status !== 'RATING') {
                return res.json({ success: true, message, data: transaction });
            }

            res.json({ success: false, message: "Failed to update product status" });

        } catch (error) {
            res.json({ success: false, message: `Error updating status in Transaction controller: ${error.message}` });
        }
    }

}

module.exports = TransactionController