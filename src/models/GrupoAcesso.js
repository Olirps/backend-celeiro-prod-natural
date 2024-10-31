const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário

const GrupoAcesso = sequelize.define('GrupoAcesso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    view: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    insert: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'grupoacesso', // Nome da tabela no banco de dados
    timestamps: false
});

GrupoAcesso.associate = (models) => {
    GrupoAcesso.hasMany(models.UserLogin, { // Consistência no nome da model
        foreignKey: 'grupoAcessoId',
        as: 'userLogin',
    });
};

module.exports = GrupoAcesso;
