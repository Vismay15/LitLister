import Error404Route from './Containers/Error/404/route';
import HomeRoute from './Containers/Home/route';
import AboutRoute from './Containers/About/route';
import AuthRoute from './Containers/Auth/route';
import ContactRoute from './Containers/Contact/route';
import TermsOfServiceRoute from './Containers/TermsOfService/route';
import SearchResultRoute from './Containers/SearchResult/route';
import BookRoute from './Containers/BookInfo/route';
import UserListing from './Containers/UserListing/route';
import UserRoute from './Containers/User/route';
import TeamRoute from './Containers/Team/route';
import ListingRoute from './Containers/Listing/route';
import AdminRoute from './Containers/Admin/route';
import TransactionRoute from './Containers/Transaction/route';
import InvestRoute from './Containers/Invest/route';
import BookReview from './Containers/BookReview/route.js';
import SellerReview from './Containers/SellerReview/route';
const routes = [
  ...HomeRoute,
  ...AboutRoute,
  ...AuthRoute,
  ...ContactRoute,
  ...SearchResultRoute,
  ...BookRoute,
  ...UserRoute,
  ...ListingRoute,
  ...AdminRoute,
  ...UserListing,
  ...TransactionRoute,
  ...TeamRoute,
  ...TermsOfServiceRoute,
  ...InvestRoute,
  ...BookReview,
  ...SellerReview,
  // Place 404 last so that incase of no match,
  // 404 will be displayed
  ...Error404Route
];

export default routes;
