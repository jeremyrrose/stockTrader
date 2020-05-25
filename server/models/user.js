const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cashBalance: Number,
        portfolio: { type: Schema.Types.Mixed, default: {} },
        transactions: [{ type: Schema.Types.ObjectId, ref: 'transactions' }]
    },
    { minimize: false }, // enables empty portfolio
    { timestamps: true }
);

User.methods.addTransaction = async function (transaction) {
    const user = this;
    const { symbol, shares, price, type } = transaction;
    console.log('Adding transaction');
    user.transactions.push(transaction);
    if (user.portfolio[`${symbol}`]) {
        user.portfolio[`${symbol}`] += type === 'buy' ? shares : (-1) * shares;
        user.cashBalance += type === 'buy' ? (-1) * shares * price : shares * price;
    } else {
        user.portfolio[`${symbol}`] = shares;
        user.cashBalance -= shares * price;
    }
    console.log(user);
    const update = await user.updateOne(user)
    console.log(update);
    return update;
}

// hashes user password before saving
User.pre('save', function (next) {  
    let user = this;
    if (!user.isModified('password')) return next;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('users', User);