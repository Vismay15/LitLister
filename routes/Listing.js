const router = require('express').Router();
const { Listing } = require('../database/api');
const authenticated = require('./middlewares/authenticated');

const fs = require('fs');

//delete a listing if user session exists and matches, sends ok
router.delete(
  '/api/list/:lid',
  authenticated,
  ({ params: { lid } }, response) => {
    return Listing.deleteListing(parseInt(lid))
      .then(_ => response.sendStatus(200))
      .catch(error => {
        return response.json(error);
      });
  }
);

// Get listing data + seller data if lid and user session exists
// User data can be accessed as data.user
router.get('/api/list/:lid', authenticated, ({ params: { lid } }, response) => {
  return Listing.getListing(parseInt(lid))
    .then(data => {
      return response.json(data);
    })
    .catch(error => {
      return response.json(error);
    });
});

// Create a listing based on data in body and send listing data if user session
// exists
router.put(
  '/api/list',
  authenticated,
  ({ body: { uid, bid, price, condition, pic, mid } }, response) => {
    return Listing.createListing(
      parseInt(uid),
      parseInt(bid),
      parseInt(price),
      condition,
      pic,
      mid
    )
      .then(data => {
        return response.json(data);
      })
      .catch(e => {
        return response.json(null);
      });
  }
);

// Update a listing based on data in body and send listing data if user
// session exists
router.put(
  '/api/list/:lid',
  authenticated,
  ({ params: { lid }, body: { price, condition, pic, mid } }, response) => {
    return Listing.updateListing(
      lid,
      parseInt(price),
      condition,
      pic,
      mid
    ).then(data => {
      return Listing.getListing(lid)
        .then(updatedData => {
          return response.json(updatedData);
        })
        .catch(_ => {
          return response.json(null);
        });
    });
  }
);

module.exports = router;
