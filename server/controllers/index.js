const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transaction');

const register = async (req, res) => {
    if (await User.findOne({email: req.body.email})) {
        return res.status(205).send();
    }
    const reqUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cashBalance: 5000
    }
    try {
        const user = await new User(reqUser);
        await user.save();
        const token = await user.generateToken();
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (await bcrypt.compare(password, user.password)) {
			const token = await user.generateToken();
			return res.status(200).json({ token });
		} else {
			res.status(401).json({ error: 'Username and password do not match.'});
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

const newTransaction = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.user });
        const transaction = await new Transaction(req.body);
        if (await transaction.save()) {
            if (await user.addTransaction(transaction)) {
                return res.status(201).json(transaction);
            } else {
                res.status(500).json({ error: 'User could not be updated.'})
            }
        } else {
            res.status(500).json({ error: 'Transaction could not be created.'})
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const viewTransactions = async (req, res) => {
    try {
        const user = await User.findByToken(req.headers.authorization.substr(7));
        const transactions = await Transaction.find({ _id: user.transactions }, { symbol: 1, price: 1, shares: 1, type: 1, createdAt: 1, _id: 0 })
        res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const viewPortfolio = async (req, res) => {
    try {
        const user = await User.findByToken(req.headers.authorization.substr(7));
        res.status(200).json({ cashBalance: user.cashBalance, portfolio: user.portfolio });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    newTransaction,
    viewTransactions,
    viewPortfolio
}