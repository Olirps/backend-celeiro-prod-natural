// src/models/Produtos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const ImpostoProduto = require('../models/ImpostoProduto');
const MovimentacoesEstoque = require('../models/MovimentacoesEstoque');
const Subgrupoproduto = require('../models/Subgrupoproduto');

const Produtos = sequelize.define('Produtos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subgrupo_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'subgrupoproduto',
              key: 'id',
            },
          },
        cProd: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cEAN: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        xProd: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        NCM: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CFOP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uCom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qCom: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        vUnCom: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        vProd: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        validade: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        qtdMinima: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        EXTIPI: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        CEST: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        indEscala: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cEANTrib: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        uTrib: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        qTrib: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        vUnTrib: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        vDesc: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        indTot: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cProdANP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descANP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        UFCons: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nBico: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nTanque: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vEncIni: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        vEncFin: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        pBio: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'produtos',
        tableName: 'produtos',
        timestamps: true
    });
  
    Produtos.associate = () => {
        Produtos.hasMany(MovimentacoesEstoque, {
        foreignKey: 'produto_id',
        as: 'movimentacoesEstoque',
      });
        Produtos.hasMany(ImpostoProduto, {
        foreignKey: 'produto_id',
        as: 'impostoProdutos',
      });
      Produtos.belongsTo(Subgrupoproduto, {
        foreignKey: 'subgrupo_id',
        as: 'subgrupoproduto',
      });
    };

    
module.exports = Produtos;