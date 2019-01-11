// Packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Files
const controllerAuth = require('./controllers/auth');
const controllerLocation = require('./controllers/locations');
const { createDatabase } = require('./helpers');

// Variables
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

createDatabase(process.env.DATABASE_USER);
createDatabase(process.env.DATABASE_LOCATION);

// Routes
app.get('/', (req, res) => res.send('Welcome'));
app.use('/auth', controllerAuth);
app.use('/locations', controllerLocation);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em 'http://localhost:${process.env.PORT}'`);
});
