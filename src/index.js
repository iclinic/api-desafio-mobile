// Packages
const fs = require('fs');
const express = require('express');
const { validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Files
const middlewareLogin = require('./middlewares/login');
const middlewareRegister = require('./middlewares/register');

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

app.post('/auth/login', middlewareLogin, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const fileData = JSON.parse(fs.readFileSync(databaseFileName));

  const { email, password } = req.body;

  const userInfo = fileData.filter(
    (user) => user.email === email && user.password === password
  );

  if (userInfo.length === 0) {
    return res.status(406).json({ error: 'Usuário não encontrado' });
  }

  const token = jwt.sign(
    { name: userInfo[0].name, email: userInfo[0].email },
    '49084b52d739f28aaaba047393d54623',
    {
      expiresIn: 86400
    }
  );

  res.json({ auth: true, token });
});

app.post('/auth/register', middlewareRegister, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(406).json({ error: errors.array() });
  }

  const fileData = JSON.parse(fs.readFileSync(databaseFileName));

  const { name, email, password } = req.body;

  const userInfo = fileData.filter((user) => user.email === email);

  if (userInfo.length !== 0) {
    return res.status(406).json({ error: 'Usuário já cadastrado' });
  }

  const newUser = {
    name,
    email,
    password
  };

  fileData.push(newUser);

  fs.writeFileSync(databaseFileName, JSON.stringify(fileData, null, 2));

  const token = jwt.sign({ name, email }, '49084b52d739f28aaaba047393d54623', {
    expiresIn: 86400
  });

  res.json({ auth: true, token });
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor rodando em 'http://localhost:${port}'`);
});
