const cryptoRandomString = require('crypto-random-string');
const sendVerificationEmail = require('./sendgridemailhelper');
const models = require('../../database/models');

const SignUpController = (req, res, next) => {
  return models.user
    .findOrCreate({
      where: { email: req.body.email },
      defaults: req.body
    })
    .spread((user, created) => {
      // if user email already exists
      if (!created) {
        return res.status(409).json('User with email address already exists');
      } else {
        return models.verificationToken
          .create({
            uid: user.uid,
            token: cryptoRandomString(16)
          })
          .then(result => {
            sendVerificationEmail(user.email, result.token);
            return res
              .status(200)
              .json('${user.email} account created successfully');
          })
          .catch(error => {
            return res.status(500).json(error);
          });
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    });
};

module.exports = SignUpController;
