const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ShoppingList', {
    idShoppingList: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    checked: {
          type: DataTypes.BOOLEAN,
          allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};