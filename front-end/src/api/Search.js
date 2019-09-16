import request from './middlewares/request';
import jsonify from './middlewares/jsonify';

export default {
  getSearchByAuthor: (author, page) =>
    request(`/search/author/${author}/page/${page}`, {}, 'get').then(jsonify),
  getSearchByIsbn: (isbn, page) =>
    request(`/search/isbn/${isbn}/page/${page}`, {}, 'get').then(jsonify),
  getSearchByTitle: (title, page) =>
    request(`/search/title/${title}/page/${page}`, {}, 'get').then(jsonify),
  getAllSearchByTitle: title =>
    request(`/search/title/${title}`, {}, 'get').then(jsonify)
};
