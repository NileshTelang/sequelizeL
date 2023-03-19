module.exports = (sequelize, DataTypes) => {
  const User_Profile = sequelize.define(
    "user_profiles",{id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }},
    {
      selfGranted : DataTypes.BOOLEAN
    },
    {
      timestamps: false,
    }
  );

  return User_Profile;
};
