const router = require('express').Router();

const bcrypt = require('bcrypt');
const { Auth } = require('../database/api');

const authenticated = require('./middlewares/authenticated');
const notAuthenticated = require('./middlewares/notAuthenticated');
const emptyStringsToNull = require('./middlewares/emptyStringsToNull');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const sendVerificationEmail = require('./middlewares/sendgridemailhelper');

router.get('/api/login', authenticated, sendUserIdAndUserName);

router.post(
  '/api/login',
  notAuthenticated,
  emptyStringsToNull,
  (request, response) => {
    const { email, password } = request.body;
    return Auth.findUserByEmail(email)
      .then(user => {
        if (user) {
          bcrypt
            .compare(password, user.password)
            .then(isEqual => {
              if (isEqual) {
                //When credentials matched
                return user;
              } else {
                //When credentials didn't match
                Promise.reject(new Error('Invalid credentials.'));
                return response.json(null);
              }
            })
            .then(user =>
              request.login(user, error => {
                if (error) {
                  return response.json(error);
                }
                return response.json({
                  uid: user.uid,
                  firstname: user.firstname,
                  lastname: user.lastname
                });
              })
            );
        } else {
          //When user is not found
          response.json(null);
        }
      })
      .catch(error => response.json(error));
  }
);

router.post('/api/logout', authenticated, (request, response) => {
  request.logout();
  //Same as sending reponse.status(200).send('OK')
  response.sendStatus(200);
});

/* New register router. First, check if the user exists, and if they do
  throw an exists error. Otherwise insert the user into the db, insert a
  verification token into the db, send the verification e-mail, and log the
  user in.
 */
router.post(
  //previously /api/register
  '/api/signup',
  notAuthenticated,
  emptyStringsToNull,
  (request, response) => {
    const { firstname, lastname, email, password } = request.body;

    // Input validation code
    const expectedEmail = /^[a-z0-9.]+@mail.sfsu.edu/;
    if (firstname == null) throw 'Your first name is required';
    if (lastname == null) throw 'Your last name is required';
    if (password == null) throw 'A password is required';
    if (!expectedEmail.test(email)) throw 'Your email must be an SFSU email';

    return Auth.findUserByEmail(email)
      .then(user => {
        if (user) return Promise.reject(new Error('User Exists'));

        return Auth.insertUser(firstname, lastname, email, password).then(
          user => {
            return Auth.insertVerificationToken(user.uid).then(verification => {
              sendVerificationEmail(user.email, verification.token);
              request.login(user, error => {
                if (error) {
                  return response.json(null);
                }
                return response.json({
                  uid: user.uid,
                  firstname: user.firstname,
                  lastname: user.lastname
                });
              });
            });
          }
        );
      })
      .catch(e => {
        response.json(e);
      });
  }
);

router.put('/api/verification', (req, res) => {
  const { email } = req.query;
  return Auth.findUserByEmail(email)
    .then(user => {
      if (user.isVerified)
        return res.status(202).json('Email Already Verified');

      return Auth.verifyUser(email)
        .then(_ => {
          return res.json(`User with ${email} verified!`);
        })
        .catch(e => {
          return res.json(e);
        });
    })
    .catch(e => {
      return res.json(e);
    });
});

module.exports = router;
