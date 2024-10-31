// src/models/TipoVeiculo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const Veiculos = require('../models/Veiculos');

const TipoVeiculo = sequelize.define('TipoVeiculo',{
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
    tableName: 'tipoveiculo',
    timestamps: true,
  });

  TipoVeiculo.associate = () => {
    TipoVeiculo.hasMany(Veiculos, {
      foreignKey: 'tipoveiculoId',
      as: 'veiculos',
    });
  };

  module.exports = TipoVeiculo;;
