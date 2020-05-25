const db = require('../db');
const faker = require('faker');
const User = require('../models/user');
const Transaction = require('../models/transaction');

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const makeUsers = async () => {
    const userdata = [1,2,3,4,5].map(num => {
        return {
            email: faker.internet.email(),
            password: 'password',
            cashBalance: 5000
        }
    })
    const users = await User.create(userdata);
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
