import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getTransactionInfo: tid =>
    request(`/transaction/${tid}`, {}, 'get').then(jsonify),
  postTransactionInfo: ({ tid, data }) =>
    request(`/transaction/${tid}`, { data })
};
