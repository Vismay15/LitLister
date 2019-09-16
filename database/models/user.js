/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'user',
    {
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM(
          'general',
          'buyer',
          'seller',
          'customerservice',
          'admin'
        ),
        allowNull: false,
        defaultValue: 'general'
      },
      email: {
        type: DataTypes.STRING(330),
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN
      },
      rating: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'user'
    }
  );
  User.associate = db => {
    User.hasOne(db.verificationToken, {
      as: 'verificationtoken',
      foreignKey: 'uid',
      foreignKeyConstraint: true
    });
    User.hasMany(db.listing, {
      as: 'Listings',
      foreignKey: 'uid'
    });
    User.hasMany(db.chat, {
      as: 'Chats',
      foreignKey: 'uid'
    });
  };
  return User;
};
