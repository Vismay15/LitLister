module.exports = function(sequelize, DataTypes) {
  const chat = sequelize.define(
    'chat',
    {
      cid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: { model: 'user', key: 'uid' }
      },
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: { model: 'user', key: 'uid' }
      },
      crid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: { model: 'chatroom', key: 'crid' }
      }
    },
    {
      tableName: 'chat',
      timestamps: false
    }
  );
  chat.associate = db => {
    chat.belongsTo(db.user, {
      as: 'Receiver',
      foreignKey: 'rid'
    });
    chat.belongsTo(db.user, {
      as: 'Sender',
      foreignKey: 'uid'
    });
    chat.belongsTo(db.chatroom, {
      as: 'Chatroom',
      foreignKey: 'crid'
    });
  };
  return chat;
};
