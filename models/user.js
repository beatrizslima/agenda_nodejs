const {Sequelize, DataTypes} = require('sequelize')
const connection = require('../database')

const User = connection.define(
    'User',
    {
        userId: {
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

module.exports = User;