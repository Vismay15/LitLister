import SearchResult from './SearchResult';

export default [
  {
    path: '/search/author/:author/page/:page',
    exact: true,
    component: SearchResult
  },
  {
    path: '/search/isbn/:isbn/page/:page',
    exact: true,
    component: SearchResult
  },
  {
    path: '/search/title/:title/page/:page',
    exact: true,
    component: SearchResult
  }
];
