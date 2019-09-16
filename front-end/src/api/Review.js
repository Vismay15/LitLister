import request from './middlewares/request';

export default {
  putBookRating: (bid, rating) =>
    request(`/book/rating`, { bid, rating }, 'put'),
  putUserRating: (uid, rating) =>
    request(`/user/rating`, { uid, rating }, 'put')
};
