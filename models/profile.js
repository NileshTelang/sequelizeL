
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "profiles",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  return Profile;
};
