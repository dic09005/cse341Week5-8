const validator = require('../helpers/validation');

const savePlayer = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    jerseyNumber: 'required|string',
    team: 'required|string',
    possition: 'required|string',
    birthday: 'required|string',
    age: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTeam = (req, res, next) => {
    const validationRule = {
      teamName: 'required|string',
      city: 'required|string',
      conference: 'required|string',
      division: 'required|string',
      coach: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
    savePlayer,
    saveTeam
};