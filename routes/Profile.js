const router = require('express').Router();
const { Auth } = require('../database/api');
const authenticated = require('./middlewares/authenticated');

router.get('/api/user/:uid', authenticated, ({ params: { uid } }, response) => {
  return Auth.findUserProfile(uid)
    .then(user => {
      return response.json(user);
    })
    .catch(e => {
      return response.json(null);
    });
});

module.exports = router;
