const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      required: true,
      validate: {
        isEmail: true,        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};