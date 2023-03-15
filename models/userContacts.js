module.exports = (sequelize, DataTypes,User,Contact) => {

const userContacts = sequelize.define('user_contacts', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, 
        key: 'id'
      }
    },
    ContactId: {
      type: DataTypes.INTEGER,
      references: {
        model: Contact, 
        key: 'id'
      }
    },
  },{
    timestamps : false
  })

  return userContacts;

};