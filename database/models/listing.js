/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Listing = sequelize.define(
    'listing',
    {
      lid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      bid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'book',
          key: 'bid'
        }
      },
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'user',
          key: 'uid'
        }
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      condition: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      imageurl: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      bookRating: {
        type: DataTypes.INTEGER(11),
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'book',
          key: 'rating'
        }
      },
      userRating: {
        type: DataTypes.INTEGER(11),
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'user',
          key: 'rating'
        }
      },
      mid: {
        type: DataTypes.INTEGER(11),
        onUpdate: 'restrict',
        onDelete: 'restrict',
        allowNull: false,
        references: {
          model: 'meeting',
          key: 'mid'
        }
      }
    },
    {
      tableName: 'listing',
      timestamps: false
    }
  );
  Listing.associate = db => {
    Listing.belongsTo(db.book, {
      as: 'Book',
      foreignKey: 'bid'
    });
    //Listing is the source model, user is the target
    Listing.belongsTo(db.user, {
      as: 'Seller',
      foreignKey: 'uid'
    });
    Listing.belongsTo(db.meeting, {
      as: 'Meeting',
      foreignKey: 'mid'
    });
  };
  return Listing;
};
