const mongoose = require('mongoose');

const dbName = 'stockTrader';

mongoose
    .connect(`mongodb://127.0.0.1:27017/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log(`MongoDB connected: ${dbName}.`);
      })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;

module.exports = db;