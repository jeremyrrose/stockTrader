const db = require('../db');
const faker = require('faker');
const User = require('../models/user');
const Transaction = require('../models/transaction');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const makeUsers = async () => {
    const users = [1,2,3,4,5].map(num => {
        return new User({
            email: faker.internet.email(),
            passwordDigest: '$2b$10$9FlugqroDF0wM3UM8J2S0Or41lJUoxdBlxv0BSZdlY16V4ou4izSa', // fake hash for first seed users
            cashBalance: 5000
        })
    })
    await User.insertMany(users);
    console.log('Created test users!');
    return users;
}

const makeTransactions = async (users) => {
    const transactions = [...Array(20)].map((num, index) => {
        let user = users[Math.floor(Math.random() * users.length)];
        return new Transaction({
            user: user._id,
            symbol: index % 2 == 0 ? 'IBM' : 'AMZN',
            price: 80,
            shares: Math.floor(Math.random() * 100),
            type: index < 10 ? 'buy' : 'sell'
        })
    })
    await Transaction.insertMany(transactions);
    console.log('Created test transactions!');
}

const run = async () => {
    const seed = await makeTransactions(await makeUsers());
    db.close()
}

run();
