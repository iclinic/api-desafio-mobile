// Packages
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Files
const controllerAuth = require('./controllers/auth');

// Variables
const app = express();
const port = 3000;
const databaseFileName = 'db.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Verify if the file to store the informations exists,
 * if not, create a empty file
 */
fs.access(databaseFileName, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFileSync(databaseFileName, '[]', (err) => {
      if (err) {
        throw new Error(
          'Não foi possivel criar o arquivo para armazenar as informações'
        );
      }
    });
  }
});

// Routes
app.get('/', (req, res) => res.send('Welcome'));

app.use('/auth', controllerAuth);

// Start the server
app.listen(port, () => {
  console.log(`Servidor rodando em 'http://localhost:${port}'`);
});
