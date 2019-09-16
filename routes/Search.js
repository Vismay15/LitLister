const router = require('express').Router();
const { Search } = require('../database/api');

router.get('/api/search/title/:title', ({ params: { title } }, response) =>
  Search.findAllBookWithoutListing(title, 'title')
    .then(data => response.json(data))
    .catch(_ => response.json(null))
);

router.get('/api/search/author/:author/page/:page', (request, response) => {
  const { author, page } = request.params;
  if (request.isAuthenticated()) {
    Search.findBookWithListing(author, 'author', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  } else {
    Search.findBookWithoutListing(author, 'author', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  }
});

router.get('/api/search/isbn/:isbn/page/:page', (request, response) => {
  const { isbn, page } = request.params;
  if (request.isAuthenticated()) {
    Search.findBookWithListing(isbn, 'isbn', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  } else {
    Search.findBookWithoutListing(isbn, 'isbn', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  }
});

router.get('/api/search/title/:title/page/:page', (request, response) => {
  const { title, page } = request.params;
  if (request.isAuthenticated()) {
    Search.findBookWithListing(title, 'title', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  } else {
    Search.findBookWithoutListing(title, 'title', page)
      .then(data => response.json(data))
      .catch(_ => response.json(null));
  }
});

module.exports = router;
