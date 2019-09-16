/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session', {
    sid: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    sess: {
      type: DataTypes.JSON,
      allowNull: false
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'session',
    timestamps: false
  });
};
