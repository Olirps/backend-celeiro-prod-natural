const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário
const GrupoAcesso = require('../models/GrupoAcesso');


const UserLogin = sequelize.define('UserLogin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpfUser: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupoAcessoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'grupoacesso', // Nome da tabela no banco, conforme definido em GrupoAcesso
            key: 'id'
        }
    }
}, {
    tableName: 'userLogin', // Nome da tabela no banco de dados
    timestamps: false,
    defaultScope: {
        rawAttributes: { exclude: ['password'] },
    },
});

// Método para validar a senha
UserLogin.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserLogin.associate = () => {
    UserLogin.belongsTo(GrupoAcesso, {
        foreignKey: 'grupoAcessoId',
        as: 'grupoacesso',
    });
};

module.exports = UserLogin;
