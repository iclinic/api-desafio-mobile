// Packages
const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

// Files
const middlewareLogin = require('../../middlewares/login');
const middlewareRegister = require('../../middlewares/register');

// Variables
const route = express.Router();
const databaseFileName = 'db.json';

route.post('/login', middlewareLogin, (req, res) => {
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

route.post('/register', middlewareRegister, (req, res) => {
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

route.get('/logout', (req, res) => {
  res.json({ auth: false, token: null });
});

module.exports = route;
