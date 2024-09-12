const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Document;