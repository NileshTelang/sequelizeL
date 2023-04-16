
module.exports = (sequelize,DataTypes) =>  {

    const Contact = sequelize.define('Contact', {
        // Model attributes are defined here
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        UserId: {
            type : DataTypes.INTEGER,
            allowNull: false
        }
        // user_id:DataTypes.INTEGER
    }, {

        timestamps: false
    });

    return Contact;

}