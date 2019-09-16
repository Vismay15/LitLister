const router = require('express').Router();
const { Rating } = require('../database/api/');

router.put('/api/book/rating', (req, res) => {
  const { bid, rating } = req.body;
  return Rating.updateBookRating(bid, rating)
    .then(data => {
      return res.sendStatus(200);
    })
    .catch(_ => {
      return res.json(null);
    });
});

router.put('/api/user/rating', (req, res) => {
  const { uid, rating } = req.body;
  return Rating.updateUserRating(uid, rating)
    .then(data => {
      return res.sendStatus(200);
    })
    .catch(_ => {
      return res.json(null);
    });
});

module.exports = router;
