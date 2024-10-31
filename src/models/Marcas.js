// src/models/Marca.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário

const Marcas = sequelize.define('Marcas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'marcas',
    timestamps: true,
  });

  Marcas.associate = () => {
    Marcas.hasMany(veiculos, {
      foreignKey: 'marcaId',
      as: 'veiculos',
    });
  };
module.exports = Marcas;
