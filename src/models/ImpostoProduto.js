const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const Produtos = require('../models/Produtos');


const ImpostoProduto = sequelize.define('ImpostoProduto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        produto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'produtos',
                key: 'id',
            },
        },
        vTotTrib: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ICMS: {
            type: DataTypes.DECIMAL(10, 2), // Pode ser ajustado conforme a estrutura do ICMS
            allowNull: true,
        },
        IPI: {
            type: DataTypes.DECIMAL(10, 2), // Pode ser ajustado conforme a estrutura do IPI
            allowNull: true,
        },
        PIS: {
            type: DataTypes.DECIMAL(10, 2), // Pode ser ajustado conforme a estrutura do PIS
            allowNull: true,
        },
        COFINS: {
            type: DataTypes.DECIMAL(10, 2), // Pode ser ajustado conforme a estrutura do COFINS
            allowNull: true,
        }                                                   
    }, {
        tableName: 'impostoProdutos',
        timestamps: false,
    });
  
    ImpostoProduto.associate = () => {
        ImpostoProduto.belongsTo(Produtos, {
        foreignKey: 'produto_id',
        as: 'produtos',
      });
    };

    module.exports = ImpostoProduto;