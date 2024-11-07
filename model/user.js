const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 10]
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;

