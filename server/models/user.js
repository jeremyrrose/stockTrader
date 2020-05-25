const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cashBalance: Number,
        portfolio: Object,
        transactions: [{ type: Schema.Types.ObjectId, ref: 'transactions' }]
    },
    { timestamps: true }
);

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