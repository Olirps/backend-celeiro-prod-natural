// src/models/MovimentacoesEstoque.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const Produtos = require('../models/Produtos');
const NotaFiscal = require('../models/NotaFiscal');

const MovimentacoesEstoque = sequelize.define('MovimentacoesEstoque', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        produto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Produtos', // Nome da tabela associada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nota_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'notaFiscal', // Nome da tabela associada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        tipo_movimentacao: {
            type: DataTypes.ENUM('entrada', 'saida'),
            allowNull: false
        },
        quantidade: {
            type: DataTypes.DECIMAL(10, 5), // Aceita números com até 10 dígitos, sendo 2 casas decimais
            allowNull: false,
            validate: {
                min: 0.00001 // Ajuste o valor mínimo se precisar aceitar valores fracionados
            }
        },
        valor_unit: {
            type: DataTypes.DECIMAL(10, 5), // Aceita números com até 10 dígitos, sendo 2 casas decimais
            allowNull: false,
            validate: {
                min: 0.00001 // Ajuste o valor mínimo se precisar aceitar valores fracionados
            }
        },
        data_movimentacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        observacoes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'MovimentacoesEstoque',
        tableName: 'movimentacoesEstoque',
        timestamps: false // Desabilita os timestamps automáticos
    });
  
    MovimentacoesEstoque.associate = () => {
        MovimentacoesEstoque.belongsTo(Produtos, {
        foreignKey: 'produto_id',
        as: 'produtos',
      }),
        MovimentacoesEstoque.belongsTo(NotaFiscal, {
        foreignKey: 'nota_id',
        as: 'notaFiscal',
      });
    };

    module.exports = MovimentacoesEstoque;
  