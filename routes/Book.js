const router = require('express').Router();
const { Book } = require('../database/api');

router.get('/api/book/:bid', ({ params: { bid } }, response) => {
  return Book.getBookData(parseInt(bid))
    .then(data => response.json(data))
    .catch(error => response.json(error));
});

router.get('/api/latestreleases', ({}, response) => {
  return Book.getLatestReleases()
    .then(data => response.json(data))
    .catch(error => response.json(error));
});

router.get('/api/book/:bid/list', ({ params: { bid } }, response) => {
  return Book.getBookListings(parseInt(bid))
    .then(data => response.json(data))
    .catch(error => response.json(error));
});

module.exports = router;
