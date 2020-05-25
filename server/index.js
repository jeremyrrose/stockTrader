const express = require('express');
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require("./db/index")

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/', routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});