const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("Recipes", {
            idRecipe: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
            },
            recipeName: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
      });
};
