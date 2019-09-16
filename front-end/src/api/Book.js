import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getBook: bid => request(`/book/${bid}`, {}, 'get').then(jsonify),
  getLatestReleases: () => request(`/latestreleases`, {}, 'get').then(jsonify),
  getBookList: bid => request(`/book/${bid}/list`, {}, 'get').then(jsonify)
};
