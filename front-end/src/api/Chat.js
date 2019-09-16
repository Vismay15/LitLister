import jsonify from './middlewares/jsonify';
import request from './middlewares/request';

export default {
  getChat: rid => request(`/chat/${rid}`, {}, 'get').then(jsonify),
  getUserChats: () => request('/userchats', {}, 'get').then(jsonify),
  getChatroom: crid => request(`/chatroom/${crid}`, {}, 'get').then(jsonify),
  putChat: rid => request(`/chat/${rid}`, {}, 'put').then(jsonify),
  putChatlog: (crid, message) =>
    request(`/chatroom/${crid}`, { message }, 'put')
};
