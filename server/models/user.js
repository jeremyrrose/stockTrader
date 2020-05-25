const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordDigest: { type: String, required: true },
        cashBalance: Number,
        portfolio: Object,
        transactions: [{ type: Schema.Types.ObjectId, ref: 'transactions' }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', User);