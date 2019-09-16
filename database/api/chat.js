const getChat = db => (uid, rid) => db.chat.findOne({ where: { uid, rid } });

const getUserChats = db => uid => db.chat.findAll({ where: { uid } });

const getChatroom = db => (uid, crid) =>
  db.chatroom.findByPk(crid, {
    include: [
      {
        model: db.chatlog,
        as: 'Chatlogs'
      },
      {
        model: db.chat,
        as: 'Chats',
        where: { uid },
        include: [
          {
            model: db.user,
            as: 'Receiver',
            attributes: ['uid', 'firstname', 'lastname']
          }
        ]
      }
    ]
  });

const createChat = db => (uid, rid) =>
  db.chatroom.create().then(chatroom =>
    db.chat
      .create({
        rid: uid,
        uid: rid,
        crid: chatroom.crid
      })
      .then(chat =>
        db.chat.create({
          uid,
          rid,
          crid: chat.crid
        })
      )
  );

const createChatlog = db => (crid, message) =>
  db.chatlog.create({ crid, message });

module.exports = db => ({
  getChat: getChat(db),
  getUserChats: getUserChats(db),
  getChatroom: getChatroom(db),
  createChat: createChat(db),
  createChatlog: createChatlog(db)
});
