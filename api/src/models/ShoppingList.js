const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("ShoppingLists", {
            idShoppingList: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
            },
            name: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            checked: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
            },
            ingredients: {
                  type: DataTypes.JSON,
                  allowNull: false,
            },
      });
};
