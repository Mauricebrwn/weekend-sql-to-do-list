
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool.js');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())


app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log(`hey. listen. http://localhost:${PORT}`)
  })