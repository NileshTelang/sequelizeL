const { Sequelize ,DataTypes,Model, QueryTypes} = require('sequelize');

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
// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize,DataTypes,Model);
db.contacts = require("./contact")(sequelize,DataTypes);
db.educations = require("./education")(sequelize,DataTypes);
db.userContacts = require("./userContacts")(sequelize,DataTypes,db.user,db.contacts);

// db.user.hasOne(db.contacts,{ foreignKey: 'user_id',as:'otherDetails'}); //userId => no need of foreinKey declaration
// db.contacts.belongsTo(db.user);

db.user.hasMany(db.contacts); //userId => no need of foreinKey declaration
db.contacts.belongsTo(db.user);

db.contacts.hasMany(db.educations); 
db.educations.belongsTo(db.contacts);

// db.user.belongsToMany(db.contacts,{through :db.userContacts});
// db.contacts.belongsToMany(db.user,{through :db.userContacts});

db.sequelize.sync({ force: false});
module.exports = db;