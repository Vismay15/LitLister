/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'meeting',
    {
      mid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      lat: {
        type: DataTypes.DOUBLE
      },
      lng: {
        type: DataTypes.DOUBLE
      },
      name: {
        type: DataTypes.STRING(150)
      },
      title: {
        type: DataTypes.STRING(150)
      },
      info: {
        type: DataTypes.STRING(500)
      }
    },
    {
      tableName: 'meeting',
      timestamps: false
    }
  );
};
