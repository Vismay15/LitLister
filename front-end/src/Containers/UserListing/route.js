import CreateUserListing from './CreateUserListing';
import UpdateUserListing from './UpdateUserListing';
export default [
  {
    path: '/user/:uid/listing',
    exact: true,
    component: CreateUserListing
  },
  {
    path: '/user/:uid/listing/:lid',
    exact: true,
    component: UpdateUserListing
  }
];
