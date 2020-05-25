const express = require('express');
const PORT = process.env.PORT || 3000;
const db = require("./db/index")

const app = express();

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send("This is root!");
});