import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getLogin: () => request('/login', {}, 'get').then(jsonify),
  postLogin: (email, password) =>
    request('/login', { email, password }).then(jsonify),
  postLogout: () => request('/logout', {}),
  postSignup: (firstname, lastname, email, password) =>
    request('/signup', { firstname, lastname, email, password }).then(jsonify),
  putVerification: email =>
    request(`/verification?email=${email}`, {}, 'put').then(jsonify)
};
