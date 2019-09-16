import Listing from './Listing';
import ListingList from './ListingList';

export default [
  {
    path: '/book/:bid/list',
    exact: true,
    component: ListingList
  },
  {
    path: '/book/:bid/list/:lid',
    exact: true,
    component: Listing
  }
];
