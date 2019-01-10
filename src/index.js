// Packages
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Files
const controllerAuth = require('./controllers/auth');
const { createFile } = require('./helpers');

// Variables
const app = express();
const port = 3000;
const databaseFileUsers = 'dbUsers.json';
const databaseFilePosts = 'dbPosts.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Verify if the file to store the informations exists,
 * if not, create a empty file
 */
fs.access(databaseFileUsers, fs.constants.F_OK, (err) => {
  if (err) {
    createFile(databaseFileUsers);
  }
});

fs.access(databaseFileUsers, fs.constants.F_OK, (err) => {
  if (err) {
    createFile(databaseFilePosts);
  }
});

// Routes
app.get('/', (req, res) => res.send('Welcome'));

app.use('/auth', controllerAuth);

// Start the server
app.listen(port, () => {
  console.log(`Servidor rodando em 'http://localhost:${port}'`);
});
