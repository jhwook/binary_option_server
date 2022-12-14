/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logfees', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    payer_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    recipient_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feeamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    typestr: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    betamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    round_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bet_expiry: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    assetId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    betId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    contractaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    fee_value: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logfees'
  });
};
