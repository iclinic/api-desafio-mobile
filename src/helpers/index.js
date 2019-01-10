// Packages
const fs = require('fs');

const createDatabase = function(dbName) {
  fs.access(dbName, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFileSync(dbName, '[]', (err) => {
        if (err) {
          throw new Error(
            `Não foi possivel criar o arquivo ${dbName} para armazenar as informações`
          );
        }
      });
    }
  });
};

module.exports = {
  createDatabase
};
