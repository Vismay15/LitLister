import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getUserProfile: uid => request(`/user/${uid}`, {}, 'get').then(jsonify)
};
