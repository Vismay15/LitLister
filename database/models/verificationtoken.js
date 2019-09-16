module.exports = function(sequelize, DataTypes) {
  const verificationToken = sequelize.define(
    'verificationToken',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: { model: 'user', key: 'uid' }
      },
      token: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          verificationToken.belongsTo(models.user, {
            as: 'user',
            foreignKey: 'uid',
            foreignKeyConstraint: true
          });
        }
      },
      tableName: 'verificationToken',
      timestamps: false
    }
  );
  return verificationToken;
};
