
module.exports = (sequelize,DataTypes) =>  {

    const Education = sequelize.define('educations', {
        // Model attributes are defined here
        courseIn : {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearIn: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        ContactId : DataTypes.INTEGER
        // user_id:DataTypes.INTEGER
    }, {

        timestamps: false
    });

    return Education;

}