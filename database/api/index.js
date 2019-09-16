const db = require('../models');
const authInit = require('./auth');
const bookInit = require('./book');
const chatInit = require('./chat');
const searchInit = require('./search');
const listingInit = require('./listing');
const meetingInit = require('./meeting');
const ratingInit = require('./rating');
//const userratingInit = require('./userrating');
//const bookratingInit = require('./bookrating');

module.exports = {
  Auth: authInit(db),
  Book: bookInit(db),
  Chat: chatInit(db),
  Search: searchInit(db),
  Listing: listingInit(db),
  Meeting: meetingInit(db),
  Rating: ratingInit(db)
  //Userrating: userratingInit(db),
  //bookrating: bookratingInit(db),
};
