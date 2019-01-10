// Packages
const fs = require('fs');

const createFile = function(dbName) {
  fs.writeFileSync(dbName, '[]', (err) => {
    if (err) {
      throw new Error(
        `Não foi possivel criar o arquivo ${dbName} para armazenar as informações`
      );
    }
  });
};

module.exports = {
  createFile
};
