module.exports = function(sequelize, DataTypes) {
  const chatroom = sequelize.define(
    'chatroom',
    {
      crid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      tableName: 'chatroom',
      timestamps: false
    }
  );
  chatroom.associate = db => {
    chatroom.hasMany(db.chatlog, {
      as: 'Chatlogs',
      foreignKey: 'crid'
    });
    chatroom.hasMany(db.chat, {
      as: 'Chats',
      foreignKey: 'crid'
    });
  };
  return chatroom;
};
