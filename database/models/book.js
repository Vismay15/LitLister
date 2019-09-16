/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const book = sequelize.define(
    'book',
    {
      bid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      author: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      isbn: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pictureurl: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(300),
        allowNull: true
      },
      rating: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      tableName: 'book',
      timestamps: false
    }
  );
  book.associate = db => {
    book.hasMany(db.listing, {
      as: 'Listings',
      foreignKey: 'bid'
    });
  };
  return book;
};
