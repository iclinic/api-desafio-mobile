const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;
const databaseFileName = 'db.json';

fs.access(databaseFileName, fs.constants.F_OK, (err) => {
  if (err) {
    fs.writeFileSync(databaseFileName, '{}', (err) => {
      if (err) {
        throw new Error(
          'Não foi possivel criar o arquivo para armazenar as informações'
        );
      }
    });
  }
});

app.get('/', (req, res) => res.send('Welcome'));

app.listen(port, () => {
  console.log(`Servidor rodando em 'https://localhost:${port}'`);
});
