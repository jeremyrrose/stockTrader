const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cashBalance: Number,
        portfolio: { type: Schema.Types.Mixed, default: {} },
        transactions: [{ type: Schema.Types.ObjectId, ref: 'transactions' }]
    },
    { minimize: false },
    { timestamps: true }
);

User.methods.addTransaction = async function (transaction) {
    const user = this;
    console.log('Adding transaction');
    user.transactions.push(transaction);
    if (user.portfolio[`${transaction.symbol}`]) {
        user.portfolio[`${transaction.symbol}`] += transaction.type === 'buy' ? transaction.shares : (-1) * transaction.shares;
    } else {
        user.portfolio[`${transaction.symbol}`] = transaction.shares;
    }
    console.log(user);
    const update = await user.updateOne({transactions: user.transactions, portfolio: user.portfolio})
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