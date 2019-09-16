const io = require('socket.io')();
const session = require('../database/config/session');
const { ChatHandler } = require('./handlers');

const init = server => {
  io.use(({ request }, next) => session(request, request.res, next));
  io.attach(server);
};

const userSockets = new Map();

io.on('connection', socket => {
  try {
    if (!!socket.request.session.passport) {
      if (socket.request.session.passport.user) {
        const { user: uid } = socket.request.session.passport;
        userSockets.set(uid.toString(), socket);
        socket.on('disconnect', () => userSockets.delete(uid.toString()));
      }
    }
  } catch (error) {}
});

module.exports = {
  init,
  Chat: ChatHandler(userSockets)
};
