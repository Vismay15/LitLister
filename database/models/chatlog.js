module.exports = function(sequelize, DataTypes) {
  const chatlog = sequelize.define(
    'chatlog',
    {
      logid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      message: {
        type: DataTypes.STRING(500)
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
      tableName: 'chatlog',
      timestamps: false
    }
  );
  chatlog.associate = db => {
    chatlog.belongsTo(db.chatroom, {
      as: 'Chatroom',
      foreignKey: 'crid'
    });
  };
  return chatlog;
};
