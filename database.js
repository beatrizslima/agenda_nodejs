const { Sequelize } = require("sequelize");

const connection = new Sequelize('agendadb', 'agenda', 'senhabanco', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection