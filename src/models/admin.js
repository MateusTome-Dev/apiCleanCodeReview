const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

// Definindo o modelo
const Admin = sequelize.define('admin', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // E-mail unico
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }
}
);

module.exports = Admin;