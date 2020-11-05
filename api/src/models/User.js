const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
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
    createdAt:{
      type: DataTypes.STRING,
          allowNull: true
    },
    updatedAt:{
      type: DataTypes.STRING,
          allowNull: true
    },
  });
};