const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const GrupoProduto = require('../models/GrupoProduto');
const Produtos = require('../models/Produtos');

const Subgrupoproduto = sequelize.define('Subgrupoproduto', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gpid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'grupoproduto',
          key: 'id',
        },
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'subgrupoproduto',
      timestamps: false,
    });

    Subgrupoproduto.associate = () => {
      Subgrupoproduto.hasMany(Produtos, {
        foreignKey: 'subgrupo_id',
        as: 'produtos',
      });
    };

  
    Subgrupoproduto.associate = () => {
        Subgrupoproduto.belongsTo(GrupoProduto, {
        foreignKey: 'gpid',
        as: 'grupoproduto',
      });
    };
  
module.exports = Subgrupoproduto;