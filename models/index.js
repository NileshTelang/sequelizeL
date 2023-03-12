const { Sequelize ,DataTypes,Model} = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', 'Trisha@41', {
    host: 'localhost',
    logging : false,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize,DataTypes,Model);
db.contacts = require("./contact")(sequelize,DataTypes);
db.sequelize.sync({ force: true });
module.exports = db;