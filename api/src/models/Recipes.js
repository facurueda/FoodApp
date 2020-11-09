const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
      sequelize.define("Recipes", {
            idRecipe: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  allowNull: false,
            },
            recipeName: {
                  type: DataTypes.STRING,
                  allowNull: false,
            },
            imageUrl: {
                  type: DataTypes.STRING,
                  allowNull: false,
            }
      });
};
