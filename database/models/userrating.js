module.exports = function(sequelize, DataTypes) {
  const userrating = sequelize.define(
    'userrating',
    {
      urid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'user',
          key: 'uid'
        }
      }
    },
    {
      tableName: 'userrating',
      timestamps: false
    }
  );
  return userrating;
};
