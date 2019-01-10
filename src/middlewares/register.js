const { check } = require('express-validator/check');

module.exports = [
  check('name')
    .exists()
    .withMessage('`Nome` não existe')
    .isLength({ min: 5, max: 50 })
    .withMessage(''),
  check('email')
    .exists()
    .withMessage('`E-mail` não existe')
    .isEmail()
    .withMessage('`E-mail` não é válido'),
  check('password')
    .exists()
    .withMessage('`Password` não existe')
    .isLength({ min: 6, max: 30 })
    .withMessage(
      '`Password` precisa ser maior que 6 caracteres e menor que 30 caracteres'
    )
];
