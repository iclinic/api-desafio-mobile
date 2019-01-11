const { check } = require('express-validator/check');

module.exports = [
  check('name')
    .exists()
    .withMessage('`Name` não existe')
    .isString()
    .withMessage('`Name` necessita ser do tipo string'),
  check('address')
    .exists()
    .withMessage('`Address` não existe')
    .isString()
    .withMessage('`Address` necessita ser do tipo string'),
  check('phone')
    .exists()
    .withMessage('`Phone` não existe')
    .matches(/^(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/)
    .withMessage(
      '`Phone` necessita estar no padrão (00) 00000-0000 ou (00) 0000-0000'
    ),
  check('type')
    .exists()
    .withMessage('`Type` não existe')
    .isString()
    .withMessage('`Type` necessita ser do tipo string'),
  check('lat')
    .exists()
    .withMessage('`Lat` não existe')
    .isString()
    .withMessage('`Lat` necessita ser do tipo string')
];
