var jwt = require('jsonwebtoken');

const verifyToken = function(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, error: '`Token` não informado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, error: 'Falha na autenticação do `Token`' });
    }

    req.userId = decoded.id;
    req.userName = decoded.name;
    req.userEmail = decoded.name;

    next();
  });
};

module.exports = verifyToken;
