const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  validators
const isInteger = (number) => {
    return Number.isInteger(number);
}
const buySell = (string) => {
    return string === 'buy' || string === 'sell';
}

// model
const Transaction = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        symbol: { type: String, required: true },
        price: Number,
        shares: { type: Number, validate: isInteger },
        type: { type: String, validate: buySell }
    },
    { timestamps: true }
);

module.exports = mongoose.model('transactions', Transaction);