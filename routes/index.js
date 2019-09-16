const router = require('express').Router();
const AuthRoute = require('./Auth');
const BookRoute = require('./Book');
const DefaultRoute = require('./Default');
const SearchRoute = require('./Search');
const ListingRoute = require('./Listing');
const MeetingRoute = require('./Meeting');
const RatingRoute = require('./Rating');
const ChatRoute = require('./Chat');
const ProfileRoute = require('./Profile');

if (process.env.LOCAL_SERVER) {
  router.use((_, response, next) => {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    response.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    response.header('Access-Control-Allow-Credentials', true);
    next();
  });
}

router.use(AuthRoute);
router.use(BookRoute);
router.use(SearchRoute);
router.use(ListingRoute);
router.use(MeetingRoute);
router.use(RatingRoute);
router.use(ChatRoute);
router.use(ProfileRoute);
router.use(DefaultRoute);

module.exports = router;
